import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Line, Circle } from '../../components/Line';
import { Owner, IssueList, Label } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return (
        <Container>
          <Owner>
            <Link to="/">
              <FaArrowLeft color="#3F4656" size={22} />
            </Link>
            <Circle className="shine" />
            <Line width="20%" className="shine" />
            <Line className="shine" />
            <Line width="50%" className="shine" />
          </Owner>
        </Container>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft color="#3F4656" size={22} />
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <Label color={label.color} key={String(label.id)}>
                      {label.name}
                    </Label>
                  ))}
                  <p>{issue.user.login}</p>
                </strong>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
