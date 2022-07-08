import { ApolloProvider } from "@apollo/client";
import { useAppContext } from "./AppProvider";
import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { relayStylePagination } from "@apollo/client/utilities";

const link = new RetryLink();

const readOnePageRelayStylePagination = () => {
  const _default = relayStylePagination();
  return {
    ..._default,
    read(existing, { args: { first, last, before, after } }) {
      if (!existing) return existing;

      const edges = [];

      if (before) {
        for (let i = 0; i < existing.edges.length; i++) {
          const edge = existing.edges[i];
          if (edge.cursor === before) {
            break;
          }
          edges.push(edge);
        }
      } else {
        const copyExistingEdges = [...existing.edges];
        copyExistingEdges.reverse();

        for (let i = 0; i < copyExistingEdges.length; i++) {
          const edge = copyExistingEdges[i];
          if (edge.cursor === after) {
            break;
          }
          edges.push(edge);
        }

        edges.reverse();
      }

      const slice = edges.slice(0, first || last);

      return {
        edges: slice,
        pageInfo: {
          ...existing.pageInfo,
          startCursor: slice?.[0]?.cursor || "",
          endCursor: slice?.[slice.length - 1]?.cursor || "",
        },
      };
    },
  };
};

function getClient(csrfToken) {
  return new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([
      new RetryLink({
        delay: {
          initial: 500,
          max: Infinity,
          jitter: true,
        },
        attempts: {
          max: 5,
          retryIf: (error, _operation) => !!error,
        },
      }),
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(
            ({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            // we need to hard refresh to the login page if we are getting auth errors
            // this depends on a backend solution
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
        if (networkError && networkError.statusCode === 403) {
          // if we lack the csrf token, hard reload
          window.location.reload();
        }
      }),
      setContext((_, { headers }) => ({
        headers: { ...headers, "X-CSRFToken": csrfToken },
      })),
      new HttpLink({
        uri: "http://localhost:8000/api/graphql",
        credentials: "include",
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            loadMore: relayStylePagination(),
            infiniteScroll: relayStylePagination(),
            nextPrevious: readOnePageRelayStylePagination(),
          },
        },
      },
    }),
  });
}

function ApolloManager({ children }) {
  const { csrfToken } = useAppContext();
  const [apolloClient, setApolloClient] = useState();

  useEffect(() => {
    if (csrfToken !== undefined) {
      setApolloClient(getClient(csrfToken));
    }
  }, [setApolloClient, csrfToken]);

  if (!apolloClient) {
    return <div>Loading...</div>;
  }

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default ApolloManager;