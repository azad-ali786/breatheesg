import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { signInWithGoogle, auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onFinish = async () => {
    try {
      const { name, email, password } = formData;
      await createUserWithEmailAndPassword(auth,email, password);
      // Update user's display name with the provided name
      const user = auth.currentUser;
      if (user) {
        updateProfile(user,{
          displayName: name,
        });
        console.log("Signup successful!");
      }
      
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Signup"
          />
        </div>
        <Form
          name="signup-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Join us</p>
          <p>Create an Account</p>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              SIGN UP
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="login-form-button google-signin-button"
              onClick={handleGoogleSignIn}
              icon={<GoogleOutlined />}
            >
              Sign In with Google
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
