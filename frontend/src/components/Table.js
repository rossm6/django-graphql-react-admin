import { useEffect, useState } from "react";
import { Box, Flex } from "theme-ui";

function InfiniteScrollTable() {
  const [columnWidths, setColumnWidths] = useState();

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

  return (
    <Flex sx={{}}>
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
                  <th className="col-1">Column 1</th>
                  <th className="col-2">Column 2</th>
                  <th className="col-3">Column 3</th>
                  <th className="col-4">Column 4</th>
                  <th className="col-5">Column 5</th>
                  <th className="col-6">Column 6</th>
                  <th className="col-7">Column 7</th>
                  <th className="col-8">Column 8</th>
                  <th className="col-9">Column 9</th>
                  <th className="col-10">Column 10</th>
                  <th className="col-11">Column 11</th>
                  <th className="col-12">Column 12</th>
                  <th className="col-13">Column 13</th>
                  <th className="col-14">Column 14</th>
                  <th className="col-15">Column 15</th>
                  <th className="col-16">Column 16</th>
                  <th className="col-17">Column 17</th>
                  <th className="col-18">Column 18</th>
                  <th className="col-19">Column 19</th>
                  <th className="col-20">Column 20</th>
                  <th className="col-21">Column 21</th>
                  <th className="col-22">Column 22</th>
                  <th className="col-23">Column 23</th>
                  <th className="col-24">Column 24</th>
                  <th className="col-25">Column 25</th>
                  <th className="col-26">Column 26</th>
                  <th className="col-27">Column 27</th>
                  <th className="col-28">Column 28</th>
                  <th className="col-29">Column 29</th>
                  <th className="col-30">Column 30</th>
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
          >
            <Box
              as="table"
              className="tbody_table"
              css={{ ...columnWidths }}
              sx={{ borderCollapse: "collapse", td: { p: 4 } }}
            >
              <thead style={{ display: "none" }}>
                <tr>
                  <th className="col-1">Column 1</th>
                  <th className="col-2">Column 2</th>
                  <th className="col-3">Column 3</th>
                  <th className="col-4">Column 4</th>
                  <th className="col-5">Column 5</th>
                  <th className="col-6">Column 6</th>
                  <th className="col-7">Column 7</th>
                  <th className="col-8">Column 8</th>
                  <th className="col-9">Column 9</th>
                  <th className="col-10">Column 10</th>
                  <th className="col-11">Column 11</th>
                  <th className="col-12">Column 12</th>
                  <th className="col-13">Column 13</th>
                  <th className="col-14">Column 14</th>
                  <th className="col-15">Column 15</th>
                  <th className="col-16">Column 16</th>
                  <th className="col-17">Column 17</th>
                  <th className="col-18">Column 18</th>
                  <th className="col-19">Column 19</th>
                  <th className="col-20">Column 20</th>
                  <th className="col-21">Column 21</th>
                  <th className="col-22">Column 22</th>
                  <th className="col-23">Column 23</th>
                  <th className="col-24">Column 24</th>
                  <th className="col-25">Column 25</th>
                  <th className="col-26">Column 26</th>
                  <th className="col-27">Column 27</th>
                  <th className="col-28">Column 28</th>
                  <th className="col-29">Column 29</th>
                  <th className="col-30">Column 30</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
                <tr>
                  <td className="col-1">Row 1</td>
                  <td className="col-2">Row 2</td>
                  <td className="col-3">Row 3</td>
                  <td className="col-4">Row 4</td>
                  <td className="col-5">Row 5</td>
                  <td className="col-6">Row 6</td>
                  <td className="col-7">Row 7</td>
                  <td className="col-8">Row 8</td>
                  <td className="col-9">Row 9</td>
                  <td className="col-10">Row 10</td>
                  <td className="col-11">Row 11</td>
                  <td className="col-12">Row 12</td>
                  <td className="col-13">Row 13</td>
                  <td className="col-14">Row 14</td>
                  <td className="col-15">Row 15</td>
                  <td className="col-16">Row 16</td>
                  <td className="col-17">Row 17</td>
                  <td className="col-18">Row 18</td>
                  <td className="col-19">Row 19</td>
                  <td className="col-20">Row 20</td>
                  <td className="col-21">Row 21</td>
                  <td className="col-22">Row 22</td>
                  <td className="col-23">Row 23</td>
                  <td className="col-24">Row 24</td>
                  <td className="col-25">Row 25</td>
                  <td className="col-26">Row 26</td>
                  <td className="col-27">Row 27</td>
                  <td className="col-28">Row 28</td>
                  <td className="col-29">Row 29</td>
                  <td className="col-30">Row 30</td>
                </tr>
              </tbody>
            </Box>
          </div>
        </div>
      </div>
      <Box
        sx={{
          height: 500,
          marginLeft: 10,
          width: 50,
          position: "relative",
          top: 61,
          overflow: "scroll",
        }}
      >
        <Box sx={{ height: 400000 }}></Box>
      </Box>
    </Flex>
  );
}

export default InfiniteScrollTable;
