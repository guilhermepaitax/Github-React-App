import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Line, Circle } from '../../components/Line';
import {
  Owner,
  IssueList,
  Label,
  ToogleButton,
  IssuesLoading,
  Pagination,
} from './styles';

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
    loadingIssues: true,
    page: 1,
    selected: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      loadingIssues: false,
    });
  }

  handleToogle = async e => {
    const { selected } = this.state;
    const selectedState = e.target.value;

    if (selected !== selectedState) {
      this.setState({ loadingIssues: true, selected: selectedState, page: 1 });

      await this.loadIssues();

      this.setState({ loadingIssues: false });
    }
  };

  handlePage = async p => {
    const { page } = this.state;
    if (p === 'next') {
      this.setState({ page: page + 1, loadingIssues: true });
    } else if (p === 'prev' && page >= 1) {
      this.setState({ page: page - 1, loadingIssues: true });
    }

    await this.loadIssues();

    this.setState({ loadingIssues: false });
  };

  loadIssues = async () => {
    const { match } = this.props;
    const { selected, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: selected,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      loadingIssues,
      selected,
      page,
    } = this.state;

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
          {issues.length > 0 && (
            <div>
              <ToogleButton
                selected={selected === 'all'}
                onClick={this.handleToogle}
                type="button"
                value="all"
              >
                Todas
              </ToogleButton>
              <ToogleButton
                selected={selected === 'open'}
                onClick={this.handleToogle}
                type="button"
                value="open"
              >
                Abertas
              </ToogleButton>
              <ToogleButton
                selected={selected === 'closed'}
                onClick={this.handleToogle}
                type="button"
                value="closed"
              >
                Fechadas
              </ToogleButton>
            </div>
          )}
          {loadingIssues ? (
            <>
              <IssuesLoading>
                <Circle size="36px" className="shine" />
                <div className="loadingContent">
                  <Line width="90%" className="shine" />
                  <Line marginTop="0px" width="60%" className="shine" />
                </div>
              </IssuesLoading>
              <IssuesLoading>
                <Circle size="36px" className="shine" />
                <div className="loadingContent">
                  <Line width="90%" className="shine" />
                  <Line marginTop="0px" width="60%" className="shine" />
                </div>
              </IssuesLoading>
              <IssuesLoading>
                <Circle size="36px" className="shine" />
                <div className="loadingContent">
                  <Line width="90%" className="shine" />
                  <Line marginTop="0px" width="60%" className="shine" />
                </div>
              </IssuesLoading>
            </>
          ) : (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={issue.html_url}
                    >
                      {issue.title}
                    </a>
                    {issue.labels.map(label => (
                      <Label color={label.color} key={String(label.id)}>
                        {label.name}
                      </Label>
                    ))}
                    <p>{issue.user.login}</p>
                  </strong>
                </div>
              </li>
            ))
          )}
          {!loadingIssues && (
            <Pagination>
              <button
                disabled={page < 2}
                onClick={() => this.handlePage('prev')}
                type="button"
              >
                Prev
              </button>
              <span>{page}</span>
              <button onClick={() => this.handlePage('next')} type="button">
                Next
              </button>
            </Pagination>
          )}
        </IssueList>
      </Container>
    );
  }
}
