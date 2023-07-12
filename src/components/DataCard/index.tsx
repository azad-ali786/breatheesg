import { Card, Checkbox, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {useState} from "react"

interface DataCardProps {
  item: {
    dimension: string;
    disclosure_code: string;
    accounting_metric: string;
    topic: string;
    additional_information: string;
    business_unit: string;
  };
  saveEditAction: (item: any) => void;
}

const DataCard: React.FC<DataCardProps> = ({ item, saveEditAction }) => {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState("");
  const disclosure_codes = item.disclosure_code
    .split(" + ")
    .filter((code) => code !== "");
  const accounting_metrics = item.accounting_metric
    .split(" + ")
    .filter((code) => code !== "");

  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = () => {
    const updatedItem = {
      data: [item.dimension, data],
      topic: parseInt(item.topic),
      additional_information: item.additional_information,
      business_unit: parseInt(item.business_unit),
    };
    saveEditAction(updatedItem);
    setEditMode(false);
    setData("");
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setData("");
  };

  return (
    <Card className="data-card">
      <div className="card-header">
        <div className="card-header-content">
          <span className="card-name">{item.dimension}</span>
          {!editMode && (
            <button className="edit-button" onClick={handleEditClick}>
              <EditOutlined />
            </button>
          )}
        </div>
      </div>
      {!editMode ? (
        disclosure_codes.map((code, index) => (
          <div className="card-content" key={index}>
            <Checkbox>
              <p className="content-checkbox">{code}</p>
            </Checkbox>
            <div className="content-accounting">
              <p>{accounting_metrics[index]}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="edit-section">
          <Input
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter data"
          />
          <Button onClick={handleSaveClick}>Save</Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </div>
      )}
    </Card>
  );
};

export default DataCard;
