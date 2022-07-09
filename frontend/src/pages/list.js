import { Box } from "theme-ui";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Table from "../components/Table";

const GET_DJANGO_MODEL_LIST = gql`
    query GET_DJANGO_MODEL_LIST ($model: django_models!) {
        table (model: $model) {
            columns {
                name
                model
                field
                relatedModels
            }
            rows {
                cursor
                cellValues
            }
        }
    }
`;

function List () {
    let { model } = useParams();

    let { data } = useQuery(GET_DJANGO_MODEL_LIST, {variables: { model }});

    if(!data) return <Box>Loading...</Box>

    const columns = data.table.columns.map(column => column.field)

    const rows = data.table.rows.map(row => { 
        const cellValues = {};
        row.cellValues.forEach((cellValue, index) => {
            cellValues[columns[index]] = cellValue;
        });
        return cellValues;
    });

    return (
        <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            height: "100vh"
        }}>
            <Table
                columns={columns}
                rows={rows}
            />
        </Box>
    );

}

export default List;