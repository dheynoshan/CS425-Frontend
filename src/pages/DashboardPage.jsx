import React from "react";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#f9f9f9",
      margin: 0,
    },
  };

  return (
    <div style={styles.page}>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
