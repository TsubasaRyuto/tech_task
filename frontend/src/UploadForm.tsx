import React from 'react'
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import './UploadForm.scss';


const mutationQuery = gql`
  mutation($imagePath: String!) {
    createAiAnalysisLog(imagePath: $imagePath) {
      imagePath
    }
  }
`

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

export default function UploadForm() {
  let input: any;
  return (
    <Mutation mutation={mutationQuery}>
      {(createAiAnalysisLog: any) => (
        <div className="upload-form">
          <form
            onSubmit={e => {
              if (!input.value) {
                alert('画像ファイルパスを入力してください')
                return
              }

              e.preventDefault();
              createAiAnalysisLog({
                variables: { imagePath: input.value },
                refetchQueries: [{
                  query: query
                }]
              });
              input.value = "";
            }}
          >
            <h1>画像分析</h1>
            <p>分析する画像ファイルパスを入力してください</p>
            <input
              type="text"
              ref={file => {
                input = file;
              }}
            />
            <button type="submit">Start</button>
          </form>
        </div>
      )}
    </Mutation>
  )
}
