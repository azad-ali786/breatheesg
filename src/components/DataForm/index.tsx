import React, { useState } from "react";
import { Button, Input, InputNumber } from "antd";
import { postData } from "../../utils/apiUtils";

interface DataFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
}

const DataForm: React.FC<DataFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<{
    dimension: string;
    topic: number;
    disclosure_code: string;
    disclosure_detail_code: string;
    accounting_metric: string;
    data_label: string;
    data_type: string;
    suggested_unit_of_measurement: number;
    additional_information: string;
  }>({
    dimension: "",
    topic: 0,
    disclosure_code: "",
    disclosure_detail_code: "",
    accounting_metric: "",
    data_label: "",
    data_type: "",
    suggested_unit_of_measurement: 0,
    additional_information: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const {
        additional_information,
        topic,
        suggested_unit_of_measurement,
        ...data
      } = formData;
      const postValues = {
        data,
        template: 0,
        additional_information,
        suggested_unit_of_measurement,
        topic,
      };

      const response = await postData(postValues);

      onSave(response);

      setFormData({
        dimension: "",
        topic: 0,
        disclosure_code: "",
        disclosure_detail_code: "",
        accounting_metric: "",
        data_label: "",
        data_type: "",
        suggested_unit_of_measurement: 0,
        additional_information: "",
      });

      onCancel();
    } catch (error) {
      console.error("Error occurred during data submission:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="data-form-container">
      <div className="data-form">
        <h2>New Custom Disclosure</h2>
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
          <InputNumber
            name="topic"
            value={formData.topic}
            onChange={(value: number | null) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                topic: value || 0,
              }))
            }
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
          <InputNumber
            name="suggested_unit_of_measurement"
            value={formData.suggested_unit_of_measurement}
            onChange={(value: number | null) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                suggested_unit_of_measurement: value || 0,
              }))
            }
          />
        </div>
        <div className="form-row">
          <label>Additional Information:</label>
          <Input.TextArea
            name="additional_information"
            value={formData.additional_information}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row button-row">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
