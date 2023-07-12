import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Card, Layout, Row, Col, Button } from "antd";
import Sidebar from "../../components/Sidebar";
import DataCard from "../../components/DataCard";
import { fetchDataAction } from "../../store/actions/dataActions";
import { RootState } from "../../store/reducers/dataReducer";
import DataForm from "../../components/DataForm";
import { PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;

type PropsFromRedux = ConnectedProps<typeof connector>;

const Dashboard: React.FC<PropsFromRedux> = ({ fetchDataAction, data }) => {
  const navigate = useNavigate();
  const [showDataForm, setShowDataForm] = useState(false);

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
          mergedObject.accounting_metric +=
            arr[i + j].accounting_metric + " + ";
        }
      }

      mergedData.push(mergedObject);
    }

    return mergedData;
  };

  const mergedData = mergeObjects(data);

  const handleShowDataForm = () => {
    setShowDataForm(true);
  };

  const handleSaveData = (formData: any) => {
    console.log(formData);
    setShowDataForm(false);
  };

  const handleCancelDataForm = () => {
    setShowDataForm(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="data-cards-container">
                {!showDataForm && (
                  <Card className="data-card">
                    <div className="card-header">
                      <div className="card-header-content">
                        <span className="card-name">Custom Disclosure</span>
                      </div>
                      <div className="card-content">
                        <Button
                          type="primary"
                          onClick={handleShowDataForm}
                          icon={<PlusOutlined />}
                          className="custom-disclosure-btn"
                        >
                          New Custom Disclosure
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
                {mergedData.map((item: any) => (
                  <DataCard key={item.dimension} item={item} />
                ))}
              </div>
            </Col>
            <Col span={12}>
              {showDataForm ? (
                <DataForm
                  onSave={handleSaveData}
                  onCancel={handleCancelDataForm}
                />
              ) : null}
            </Col>
          </Row>
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
