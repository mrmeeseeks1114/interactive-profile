import {
  Card,
  Tag,
  Typography,
} from "antd";

import {
  DesktopOutlined,
  MessageOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { profile } from "../data/profile";

const {
  Title,
  Paragraph,
  Text,
} = Typography;

export default function About() {
  return (
    <section className="section">

      <Card className="about-card">

        <div className="avatar">
          {profile.initials}
        </div>

        <div className="about-info">

          <Tag color="red">
            {profile.vibe}
          </Tag>

          <Title level={2}>
            {profile.names.join(
              " / "
            )}
          </Title>

          <Text type="secondary">
            {profile.tagline}
          </Text>

          <Paragraph>
            {profile.description}
          </Paragraph>

          <Paragraph>
            <DesktopOutlined />
            {" "}
            {profile.about}
          </Paragraph>

          <div className="about-tags">

            <Tag
              icon={
                <ThunderboltOutlined />
              }
            >
              {profile.personality}
            </Tag>

            <Tag
              color="red"
              icon={
                <MessageOutlined />
              }
            >
              talk to me
            </Tag>

          </div>

        </div>

      </Card>

    </section>
  );
}