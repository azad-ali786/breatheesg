import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Layout } from "antd";
import Sidebar from "../../components/Sidebar";
import DataCard from "../../components/DataCard";
import { fetchDataAction } from "../../store/actions/dataActions";
import { RootState } from "../../store/reducers/dataReducer";

const { Content } = Layout;

type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard: React.FC<PropsFromRedux> = ({ fetchDataAction, data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          navigate("/");
        }
      });
      return () => {
        unsubscribe();
      };
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    fetchDataAction();
  }, [fetchDataAction]);

  const mergeObjects = (arr: any[]) => {
    const mergedData = [];

    for (let i = 0; i < arr.length; i += 5) {
      const mergedObject = {
        dimension: arr[i].dimension,
        disclosure_code: "",
        accounting_metric: "",
      };

      for (let j = 0; j < 5; j++) {
        if (arr[i + j]) {
          mergedObject.disclosure_code += arr[i + j].disclosure_code + " + ";
          mergedObject.accounting_metric += arr[i + j].accounting_metric + " + ";
        }
      }

      mergedData.push(mergedObject);
    }

    return mergedData;
  };


  const mergedData = mergeObjects(data);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: "24px" }}>
          <div className="dashboard-content">
            {mergedData.map((item: any) => (
              <DataCard key={item.dimension} item={item} />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    data: state.data,
  };
};

const connector = connect(mapStateToProps, { fetchDataAction });

export default connector(Dashboard);
