from django.db import models

class AiAnalysisLog(models.Model):
    class Meta:
        db_table = 'ai_analysis_logs'

    image_path = models.FileField(max_length=255)
    success = models.CharField(max_length=255)
    message = models.CharField(max_length=255)
    # 課題で指定されているclassだとpythonのclassと衝突してしまうため変更しました
    analysis_class = models.IntegerField(null=True)
    confidence = models.DecimalField(max_digits=5, decimal_places=4, null=True)
    request_timestamp = models.PositiveIntegerField()
    response_timestamp = models.PositiveIntegerField()
