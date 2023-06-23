import React from "react";
import { Table } from "reactstrap";

const tableItems = [
  {
    uid: "01",
    customer: "Bobby Davis",
    date: "Nov 14, 2021",
    invoice: "$2,410",
    action: "Confirmed",
    badge: 'success',
  },
  {
    uid: "02",
    customer: "Christopher Neal",
    date: "Nov 21, 2021",
    invoice: "$1,450",
    action: "Waiting",
    badge: 'warning',
},
{
    uid: "03",
    customer: "Monkey Karry",
    date: "Nov 24, 2021",
    invoice: "$3,500",
    action: "Confirmed",
    badge: 'success',
},
{
    uid: "04",
    customer: "Aaron James",
    date: "Nov 25, 2021",
    invoice: "$6,875",
    action: "Cancelled",
    badge: 'danger',
  },
];


export const TableComponent = () => {
  return (
      <div className="table-responsive" style={{marginTop: "30px"}}>
        <Table className="table-striped table-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Invoice</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableItems.map((item, key) => (
              <tr key={item.uid}>
                <td className="fw-medium">{item.uid}</td>
                <td>{item.customer}</td>
                <td>{item.date}</td>
                <td>{item.action}</td>
                <td>
                  <span className={`badge bg-${item.badge}`}>Confirmed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
};
