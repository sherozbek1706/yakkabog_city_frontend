import { Fragment } from "react";
import { Route, Routes as Router } from "react-router-dom";
import {
  AddApartment,
  Admin,
  Anketa,
  Bayonnoma,
  ContractAdd,
  ContractGet,
  ContractList,
  ContractPDF,
  Floor,
  GetModel,
  Home,
  ListAnketa,
  Login,
} from "../../pages";
import { Apartment } from "../../pages/apartment/apartment";
import { Layout } from "../../components";
import { Model } from "../../pages/model/model";
import ContractJadval from "../../pages/contract/jadval/contract-jadval";
export const RouterComponent = () => {
  return (
    <Fragment>
      <Router>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/apartment" element={<Apartment />} />
          <Route path="/apartment/floor/:id" element={<Floor />} />
          <Route path="/add-apartment" element={<AddApartment />} />
          <Route path="/anketa" element={<Anketa />} />
          <Route path="/contract-add" element={<ContractAdd />} />
          <Route path="/contract-list" element={<ContractList />} />
          <Route path="/contract-get/:id" element={<ContractGet />} />
          <Route path="/anketa-list" element={<ListAnketa />} />
        </Route>
        <Route path="/model" element={<Model />} />
        <Route path="/get-model" element={<GetModel />} />
        <Route path="/pdf-contract" element={<ContractPDF />} />
        <Route path="/pdf-bayonnoma" element={<Bayonnoma />} />
        <Route path="/pdf-jadval" element={<ContractJadval />} />
      </Router>
    </Fragment>
  );
};
