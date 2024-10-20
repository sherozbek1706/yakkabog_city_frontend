import React, { Fragment } from "react";
import { Header } from "../../components";
import { useQuery } from "react-query";
import "./admin.css";
import { Errors } from "../../utils/errors";
import { getRequest } from "../../request";

const fetchData = async () => {
  const data = await getRequest("admin/list");
  return data;
};

export const Admin = () => {
  const { data, error, isLoading } = useQuery("admin", fetchData);

  if (error) Errors(error);
  return (
    <Fragment>
      <Header title="ADMINLAR BO'LIMI" />
      <div className="Admin">
        <div className="MainTable">
          <table className="MainTable__list">
            <thead>
              <tr>
                <th>ID</th>
                <th>ISM</th>
                <th>FAMILYA</th>
                <th>USERNAME</th>
                <th>TELEFON RAQAM</th>
                <th>VAZIFASI</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? "Loading..."
                : data?.data?.data?.result.map((elem) => (
                    <tr key={elem.id}>
                      <td>{elem.id}</td>
                      <td>{elem.first_name}</td>
                      <td>{elem.last_name}</td>
                      <td>{elem.username}</td>
                      <td>{elem.phone_number}</td>
                      <td>{elem.role}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
