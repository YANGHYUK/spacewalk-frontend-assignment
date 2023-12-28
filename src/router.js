import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import IssuesPage from "./pages/issues";
import NotFountPage from "./pages/404";
import ComponentTestPage from "./pages/component-test";
import Modals from "components/modals";

// 라우터 설정
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ComponentTestPage />} />

      <Route path="/home" element={<IssuesPage />} />
      {/* 404 페이지를 위한 Route 설정 */}
      <Route path="*" element={<NotFountPage />} />
    </Routes>
    <Modals />
  </BrowserRouter>
);

export default Router;
