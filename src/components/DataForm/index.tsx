import React, { useState } from "react";
import { Button, Input } from "antd";

interface DataFormProps {
  onSave: (data: any) => void;
}

const DataForm: React.FC<DataFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    dimension: "",
    topic: "",
    disclosure_code: "",
    disclosure_detail_code: "",
    accounting_metric: "",
    data_label: "",
    data_type: "",
    suggested_unit_of_measurement: "",
    additional_information: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="data-form">
      <h2>Data Form</h2>
      <div className="form-row">
        <label>Dimension:</label>
        <Input
          name="dimension"
          value={formData.dimension}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Topic:</label>
        <Input
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Disclosure Code:</label>
        <Input
          name="disclosure_code"
          value={formData.disclosure_code}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Disclosure Detail Code:</label>
        <Input
          name="disclosure_detail_code"
          value={formData.disclosure_detail_code}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Accounting Metric:</label>
        <Input
          name="accounting_metric"
          value={formData.accounting_metric}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Data Label:</label>
        <Input
          name="data_label"
          value={formData.data_label}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Data Type:</label>
        <Input
          name="data_type"
          value={formData.data_type}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Suggested Unit of Measurement:</label>
        <Input
          name="suggested_unit_of_measurement"
          value={formData.suggested_unit_of_measurement}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <label>Additional Information:</label>
        <Input
          name="additional_information"
          value={formData.additional_information}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default DataForm;
