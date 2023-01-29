import React, { useState, useEffect } from "react";
import "./Report.css";
import { useSelector, useDispatch } from "react-redux";
import { Repotlist } from "../../Function/Reportlog";
import Dropdown from "react-bootstrap/Dropdown";
import AdminToolbar from "./AdminToolbar";
import "./Adminhome.css";

function Report() {
  const [Data, setData] = useState([]);
  const [Datalog, setDatalog] = useState([]);
  const user = useSelector((state) => ({ ...state }));
  const Log = Object.values(Datalog);

  useEffect(() => {
    //code

    loadData();
  }, []);

  function loadData() {
    Repotlist().then((res) => {
      setData(res.data);
      setDatalog(res.data[0].Log);
    });
  }

  const [catText, setDropDownText] = useState("Select Category");
  const [select, setSelect] = useState("");
  const filterExamList = Data.filter((exam) => {
    if (select === "") {
      return exam;
    } else {
      return exam.ExamId === select;
    }
  });


  return (
    <div className="adminwrap">
      <AdminToolbar />
      <div className="Report_wrap">
        <div className="Report-column">
          <div className="Report-header">
            <h2>Report</h2>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-cat">
              {catText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Data.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    setSelect(item.ExamId);
                    setDropDownText(item.ExName);
                  }}
                >
                  {item.ExName}
                </Dropdown.Item>
              ))}
              <Dropdown.Item as="button" onClick={(id) => { setSelect(""); setDropDownText("ALL") }}>ALL</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="Report-item">
            <table className="table">
              <thead className="Report-headerTable">
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Text</th>
                </tr>
              </thead>

              <tbody >

                {filterExamList.map((item, idex) => (
                  <>
                    {item.Log.map((item2, idex2) =>
                      <tr className="Report-table ">
                        <td>{item2.Number}</td>
                        <td>{item2.Name}</td>
                        <td>{item2.Username}</td>
                        <td>{item2.Text}</td>
                      </tr>
                    )}
                  </>
                ))}

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
