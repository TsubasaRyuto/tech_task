import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UploadForm from './UploadForm';
import './App.scss';

const query = gql`
  {
    aiAnalysisLogs {
      id
      imagePath
      success
      message
      analysisClass
      confidence
      requestTimestamp
      responseTimestamp
    }
  }
`

const App = () => (
  <Query query={query}>
    {({ loading, error, data }: any) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.toString()}</p>;
      const logs = data.aiAnalysisLogs;
      return(
        <div>
          <UploadForm />
          <table className="content-table">
            <tbody>
              <tr>
                <th>id</th>
                <th>image-path</th>
                <th>success</th>
                <th>message</th>
                <th>class</th>
                <th>confidence</th>
                <th>request-time</th>
                <th>response-time</th>
              </tr>
              { logs.map((log: any) => (
                <tr key={log.id}>
                  <td>{ log.id }</td>
                  <td>{ log.imagePath }</td>
                  <td>{ log.success }</td>
                  <td>{ log.message }</td>
                  <td>{ log.analysisClass }</td>
                  <td>{ log.confidence }</td>
                  <td>{ log.requestTimestamp }</td>
                  <td>{ log.responseTimestamp }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }}
  </Query>
);

export default App;
