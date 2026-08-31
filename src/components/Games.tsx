import {
  Card,
  Col,
  Row,
  Tag,
  Typography,
} from "antd";

import {
  DesktopOutlined,
} from "@ant-design/icons";

import { games } from "../data/profile";

const {
  Title,
  Paragraph,
} = Typography;

export default function Games() {
  return (
    <section className="section">

      <Title level={2}>
        games i play 🎮
      </Title>

      <Paragraph type="secondary">
        these are the games you'll
        probably find me playing.
      </Paragraph>

      <Row gutter={[15, 15]}>

        {games.map((game) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            key={game}
          >

            <Card
              hoverable
              className="game-card"
            >

              <DesktopOutlined />

              <Title level={4}>
                {game}
              </Title>

              <Tag color="red">
                GAME
              </Tag>

            </Card>

          </Col>
        ))}

      </Row>

    </section>
  );
}