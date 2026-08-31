import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Spin,
  Empty,
} from "antd";

import {
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
  MessageOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { supabase } from "../supabase";

import "./Exclusive.css";

type ExclusiveProps = {
  unlocked: boolean;
  password: string;
  setPassword: React.Dispatch<
    React.SetStateAction<string>
  >;
  onUnlock: () => void;
  onOpen: () => void;
};

type Visitor = {
  id: number;
  username: string;
  created_at: string;
};

type VisitorMessage = {
  id: number;
  username: string;
  message: string;
  created_at: string;
};

type QuizResult = {
  id: number;
  username: string;
  score: number;
  total: number;
  created_at: string;
};

type Interaction = {
  id: number;
  username: string;
  type: string;
  details: string | null;
  created_at: string;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

export default function Exclusive({
  unlocked,
  password,
  setPassword,
  onUnlock,
}: ExclusiveProps) {
  const [visitors, setVisitors] = useState<
    Visitor[]
  >([]);

  const [messages, setMessages] = useState<
    VisitorMessage[]
  >([]);

  const [quizResults, setQuizResults] = useState<
    QuizResult[]
  >([]);

  const [interactions, setInteractions] = useState<
    Interaction[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const loadDashboard = async () => {
    setLoading(true);

    try {
      const [
        visitorsResponse,
        messagesResponse,
        quizResponse,
        interactionsResponse,
      ] = await Promise.all([
        supabase
          .from("visitors")
          .select("*")
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("messages")
          .select("*")
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("quiz_results")
          .select("*")
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("interactions")
          .select("*")
          .order("created_at", {
            ascending: false,
          }),
      ]);

      if (visitorsResponse.error) {
        console.error(
          visitorsResponse.error
        );
      }

      if (messagesResponse.error) {
        console.error(
          messagesResponse.error
        );
      }

      if (quizResponse.error) {
        console.error(
          quizResponse.error
        );
      }

      if (interactionsResponse.error) {
        console.error(
          interactionsResponse.error
        );
      }

      setVisitors(
        visitorsResponse.data ?? []
      );

      setMessages(
        messagesResponse.data ?? []
      );

      setQuizResults(
        quizResponse.data ?? []
      );

      setInteractions(
        interactionsResponse.data ?? []
      );
    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (unlocked) {
      loadDashboard();
    }
  }, [unlocked]);

  /* =====================================
     LOCKED
  ===================================== */

  if (!unlocked) {
    return (
      <section
        id="exclusive"
        className="exclusive-section"
      >
        <div className="exclusive-container">

          <div className="exclusive-box locked">

            <div className="exclusive-icon">
              <LockOutlined />
            </div>

            <span className="exclusive-label">
              PRIVATE LOG
            </span>

            <h2>
              this part is exclusive.
            </h2>

            <p className="exclusive-description">
              curious what's happening behind
              the scenes? 👀
              <br />
              enter the password to access my
              private dashboard.
            </p>

            <div className="exclusive-login">

              <Input.Password
                size="large"
                value={password}
                placeholder="enter password..."
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                onPressEnter={onUnlock}
              />

              <Button
                danger
                type="primary"
                size="large"
                onClick={onUnlock}
                icon={<UnlockOutlined />}
              >
                UNLOCK
              </Button>

            </div>

            <span className="exclusive-hint">
              🔒 password required
            </span>

          </div>

        </div>
      </section>
    );
  }

  /* =====================================
     DASHBOARD
  ===================================== */

  return (
    <section
      id="exclusive"
      className="exclusive-section"
    >
      <div className="exclusive-container">

        <div className="exclusive-box unlocked">

          {/* HEADER */}

          <div className="exclusive-dashboard-header">

            <div>

              <span className="exclusive-label">
                PRIVATE LOG
              </span>

              <h2>
                welcome back. 🔓
              </h2>

              <p>
                here's what's been happening
                on the site.
              </p>

            </div>

            <Button
              icon={<ReloadOutlined />}
              onClick={loadDashboard}
              loading={loading}
            >
              REFRESH
            </Button>

          </div>


          {/* LOADING */}

          {loading ? (
            <div className="exclusive-loading">
              <Spin size="large" />
              <p>
                loading the chaos...
              </p>
            </div>
          ) : (
            <>

              {/* =================================
                  STATISTICS
              ================================= */}

              <div className="exclusive-stats">

                <div className="exclusive-stat">

                  <UserOutlined />

                  <strong>
                    {visitors.length}
                  </strong>

                  <span>
                    VISITORS
                  </span>

                </div>


                <div className="exclusive-stat">

                  <MessageOutlined />

                  <strong>
                    {messages.length}
                  </strong>

                  <span>
                    MESSAGES
                  </span>

                </div>


                <div className="exclusive-stat">

                  <TrophyOutlined />

                  <strong>
                    {quizResults.length}
                  </strong>

                  <span>
                    QUIZZES
                  </span>

                </div>


                <div className="exclusive-stat">

                  <ThunderboltOutlined />

                  <strong>
                    {interactions.length}
                  </strong>

                  <span>
                    INTERACTIONS
                  </span>

                </div>

              </div>


              {/* =================================
                  RECENT VISITORS
              ================================= */}

              <div className="exclusive-panel">

                <div className="panel-title">

                  <h3>
                    👥 Recent Visitors
                  </h3>

                  <span>
                    {visitors.length} total
                  </span>

                </div>

                {visitors.length === 0 ? (
                  <Empty
                    description="no visitors yet"
                  />
                ) : (
                  <div className="visitor-list">

                    {visitors
                      .slice(0, 10)
                      .map((visitor) => (
                        <div
                          className="visitor-row"
                          key={visitor.id}
                        >

                          <div className="visitor-user">

                            <div className="visitor-avatar">
                              @
                            </div>

                            <div>

                              <strong>
                                @{visitor.username}
                              </strong>

                              <small>
                                {formatDate(
                                  visitor.created_at
                                )}
                              </small>

                            </div>

                          </div>

                          <span className="status-dot">
                            ●
                          </span>

                        </div>
                      ))}

                  </div>
                )}

              </div>


              {/* =================================
                  MESSAGES
              ================================= */}

              <div className="exclusive-panel">

                <div className="panel-title">

                  <h3>
                    💬 Messages & Feedback
                  </h3>

                  <span>
                    {messages.length} total
                  </span>

                </div>

                {messages.length === 0 ? (
                  <Empty
                    description="no messages yet"
                  />
                ) : (
                  <div className="message-list">

                    {messages
                      .slice(0, 10)
                      .map((item) => (
                        <div
                          className="message-entry"
                          key={item.id}
                        >

                          <div className="message-entry-top">

                            <strong>
                              @{item.username}
                            </strong>

                            <small>
                              {formatDate(
                                item.created_at
                              )}
                            </small>

                          </div>

                          <p>
                            "{item.message}"
                          </p>

                        </div>
                      ))}

                  </div>
                )}

              </div>


              {/* =================================
                  QUIZ RESULTS
              ================================= */}

              <div className="exclusive-panel">

                <div className="panel-title">

                  <h3>
                    🧠 Quiz Results
                  </h3>

                  <span>
                    {quizResults.length} attempts
                  </span>

                </div>

                {quizResults.length === 0 ? (
                  <Empty
                    description="no quiz results yet"
                  />
                ) : (
                  <div className="quiz-result-list">

                    {quizResults
                      .slice(0, 10)
                      .map((result) => {

                        const percentage =
                          result.total > 0
                            ? Math.round(
                                (result.score /
                                  result.total) *
                                  100
                              )
                            : 0;

                        return (
                          <div
                            className="quiz-result"
                            key={result.id}
                          >

                            <div>

                              <strong>
                                @{result.username}
                              </strong>

                              <small>
                                {formatDate(
                                  result.created_at
                                )}
                              </small>

                            </div>

                            <div className="quiz-score">

                              <strong>
                                {result.score}/
                                {result.total}
                              </strong>

                              <span>
                                {percentage}%
                              </span>

                            </div>

                          </div>
                        );
                      })}

                  </div>
                )}

              </div>


              {/* =================================
                  INTERACTIONS
              ================================= */}

              <div className="exclusive-panel">

                <div className="panel-title">

                  <h3>
                    ⚡ Recent Activity
                  </h3>

                  <span>
                    {interactions.length} events
                  </span>

                </div>

                {interactions.length === 0 ? (
                  <Empty
                    description="no activity yet"
                  />
                ) : (
                  <div className="activity-list">

                    {interactions
                      .slice(0, 15)
                      .map((item) => (
                        <div
                          className="activity-row"
                          key={item.id}
                        >

                          <div>

                            <strong>
                              @{item.username}
                            </strong>

                            <span>
                              {item.type}
                            </span>

                            {item.details && (
                              <small>
                                {item.details}
                              </small>
                            )}

                          </div>

                          <time>
                            {formatDate(
                              item.created_at
                            )}
                          </time>

                        </div>
                      ))}

                  </div>
                )}

              </div>

            </>
          )}

        </div>

      </div>
    </section>
  );
}