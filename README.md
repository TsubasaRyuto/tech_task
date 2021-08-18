## 構成
* Front - React.js
* Backend - Python Django
* mock - 自作
* API - GraphQL
* DB - MySQL
* 環境 - Docker

## ファイル構成
```
| - backend
|   |- mock (mock server用 mock serverも簡単なものですが自作してあります)
|   |- src (djangoアプリケーションディレクトリ)
|      |- config ( djangoの概念で言うところのプロジェクトディレクトリ）
|      |- app ( djangoの概念で言うところのアプリケーションディレクトリ）
|         |- models (ai_analysis_logモデル格納）
|         |- schema.py (Grapheneのschema.pyファイル 改題メイン処理が記述されています）
|   |- django (Dockerfile等)
|   |- db (Dockerfile等)
| - frontend (React.jsのデフォルト構造 + Dockerfile）
|
```

## Djangoの構造に関する思考
元々Railsをやっていたと言うこともあり、基本的にmodelsのclassは1クラス1ファイルな構成を作りたい
と考え実装しております。また、そのほかにもプロジェクトディレクトリやアプリケーションディレクトリも
Rails likeなフォルダー構造にするために、config / appという名前を採用しております。

GraphQL周りフォルダ構成も1クラス１ファイル構成を作りたかったのですが、時間の都合上今回は、１ファイルへまとめております。

またservice層などを用意し、ビジネスロジックをserviceへ委託することも考えましたが、機能数が1つということもあり今回はそのような
構造にはしておりません。

## How to setup
docker-composeが使える環境を用意してください

### build & up
shellscriptを用意してあるので以下のコマンド実行していただければ、コンテナが立ち上がるようになっております。
```
./start-service.sh
```

