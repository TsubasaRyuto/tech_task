import graphene
import requests
from datetime import datetime
from graphene_django import DjangoObjectType
from .models import *

class AiAnalysisLogType(DjangoObjectType):
    class Meta:
        model = AiAnalysisLog

class Query(graphene.ObjectType):
    ai_analysis_logs = graphene.List(AiAnalysisLogType)

    def resolve_ai_analysis_logs(self, info, **kwargs):
        return AiAnalysisLog.objects.all()

class CreateAiAnalysisLog(graphene.Mutation):
    id = graphene.ID()
    image_path = graphene.String()
    success = graphene.String()
    message = graphene.String()
    analysis_class = graphene.String()
    confidence = graphene.Decimal()
    request_timestamp = graphene.Int()
    response_timestamp = graphene.Int()

    class Arguments:
        image_path = graphene.String()

    def mutate(self, info, image_path):
        # NOTE: 課題要求されている処理コード
        # (APIに対してリクエストを投げ、レスポンスをDBに保存する処理を作成してください)

        data = {}
        # NOTE: request_timestampとresponse_timestampについて、何を期待したデータなのかが不明確
        # だったため、リクエスト時とリクエストに対するレスポンスが返ってきた時にdatetimeよりtimestampを生成
        request_timestamp = datetime.now().strftime('%s')
        try:
            # APIリクエスト
            # JSONが返却されることが期待されるmock-serverを用意してあります　
            # NOTE: 動作することを目的とし、ハードコーディングします
            url = 'http://mock-server:9999/api/mock/success'
            payload = { 'image_path': image_path }
            r = requests.get(url)
            data = r.json()
        except requests.exceptions.RequestException as e:
            return e
        else:
            # DBへの保存処理
            response_timestamp = datetime.now().strftime('%s')
            if data['success']:
                _analysis_class = data['estimated_data']['class']
                _confidence = data['estimated_data']['confidence']
            else:
                _analysis_class = None
                _confidence = None

            log = AiAnalysisLog(
                image_path=image_path,
                success=data['success'],
                message=data['message'],
                analysis_class=_analysis_class,
                confidence=_confidence,
                request_timestamp=request_timestamp,
                response_timestamp=response_timestamp
            )

            log.save()
            return log

class Mutation(graphene.ObjectType):
    create_ai_analysis_log = CreateAiAnalysisLog.Field()
