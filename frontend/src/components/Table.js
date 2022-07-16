import { useEffect, useRef, useState } from "react";
import { Box, Flex } from "theme-ui";

/**
 * Mock data - to delete
 */

const nColumns = 30;
const nRows = 1000;

const DEFAULT_COLUMNS = [];
for (let i = 0; i < nColumns; i++) {
  DEFAULT_COLUMNS.push(`Column ${i + 1}`);
}

const DEFAULT_ROWS = [];
for (let i = 0; i < nRows; i++) {
  let row = [];
  for (let j = 0; j < nColumns; j++) {
    row.push(`row${i + 1}: column${j + 1}`);
  }
  DEFAULT_ROWS.push(row);
}

function InfiniteScrollTable() {
  const [columnWidths, setColumnWidths] = useState();
  const [showScrollBar, setShowScrollBar] = useState(false);
  const tableWrapper = useRef();
  const tbodyRef = useRef();
  const verticalScrollBox = useRef();
  const rowHeight = 50;
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const columnWidths = {};
    const thead_table = document.querySelectorAll(
      "table.thead_table thead tr th"
    );

    for (let i = 0; i < thead_table.length; i++) {
      let width = thead_table[i].offsetWidth;
      columnWidths[`.col-${i + 1}`] = {
        minWidth: width,
        width,
        maxWidth: width,
      };
    }

    setColumnWidths(columnWidths);
  }, [setColumnWidths]);

  const tableWidth =
    columnWidths &&
    Object.values(columnWidths).reduce((acc, cur) => acc + cur.width, 0);

  const columns = DEFAULT_COLUMNS;
  const rows = DEFAULT_ROWS;

  const scrollHeight = rowHeight * rows.length;

  useEffect(() => {
    verticalScrollBox.current.scrollTop = scrollTop;
  }, [scrollTop]);

  function scrollTable(e) {
    if (e.deltaY > 0) {
      // scrolling downwards
      setScrollTop(
        scrollTop + tbodyRef.current.offsetHeight + rowHeight > scrollHeight
          ? scrollHeight - tbodyRef.current.offsetHeight
          : scrollTop + tbodyRef.current.offsetHeight + rowHeight
      );
    } else {
      setScrollTop(scrollTop - rowHeight < 0 ? 0 : scrollTop - rowHeight);
    }
  }

  return (
    <>
      <Flex
        onMouseOver={(e) => {
          verticalScrollBox.current.scrollTop = scrollTop;
          setShowScrollBar(true);
        }}
        onMouseLeave={(e) => {
          verticalScrollBox.current.scrollTop = scrollTop;
          setShowScrollBar(false);
        }}
        onWheel={(e) => scrollTable(e)}
      >
        <div style={{ overflowX: "auto" }}>
          <div style={{ marginBottom: 20 }}>
            <div>
              <Box
                as="table"
                className="thead_table"
                css={{ ...columnWidths }}
                sx={{
                  background: "#f2f2f2",
                  borderCollapse: "collapse",
                  th: {
                    p: 4,
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th className={`col-${index + 1}`} key={column}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
              </Box>
            </div>
            <div
              style={{
                height: 500,
                maxHeight: 500,
                overflow: "hidden",
                width: tableWidth,
              }}
              ref={tbodyRef}
            >
              <Box
                as="table"
                className="tbody_table"
                css={{ ...columnWidths }}
                sx={{ borderCollapse: "collapse", td: { p: 4 } }}
              >
                <thead style={{ display: "none" }}>
                  <tr>
                    {columns.map((column, index) => (
                      <th className={`col-${index + 1}`} key={column}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      {row.map((cell, index) => (
                        <td className={`col-${index + 1}`} key={cell}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Box>
            </div>
          </div>
        </div>
        <Box
          ref={verticalScrollBox}
          sx={{
            height: 500,
            marginLeft: 10,
            width: 50,
            position: "relative",
            top: 61,
            overflow: "scroll",
          }}
        >
          {showScrollBar && <Box sx={{ height: scrollHeight }}></Box>}
        </Box>
      </Flex>
    </>
  );
}

const DEFAULT_TYPE_TYPE = "infiniteScroll";

function Table() {
  const [type, setType] = useState(DEFAULT_TYPE_TYPE);

  if (type === "infiniteScroll") return <InfiniteScrollTable />;

  return <div>Bad config</div>;
}

export default Table;
