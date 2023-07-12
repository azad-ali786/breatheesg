import React from "react";
import { Card, Checkbox } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface DataCardProps {
  item: {
    dimension: string;
    disclosure_code: string;
    accounting_metric: string;
  };
}

const DataCard: React.FC<DataCardProps> = ({ item }) => {
  const disclosure_codes = item.disclosure_code.split(" + ");
  const accounting_metrics = item.accounting_metric.split(" + ");

  return (
    <Card className="data-card">
      <div className="card-header">
        <div className="card-header-content">
          <span className="card-name">{item.dimension}</span>
          <button className="edit-button">
            <EditOutlined />
          </button>
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="card-content" key={index}>
          <Checkbox>
            <p className="content-checkbox">{disclosure_codes[index]}</p>
          </Checkbox>
          <div className="content-accounting">
            <p>{accounting_metrics[index]}</p>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default DataCard;
