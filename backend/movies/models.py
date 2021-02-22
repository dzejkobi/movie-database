from django.db import models


class Favourite(models.Model):
    created_at = models.DateTimeField('created at', auto_now_add=True)
    changed_at = models.DateTimeField('changed at', auto_now=True)
    user = models.ForeignKey(verbose_name='user', to='users.User', on_delete=models.CASCADE)
    imdb_id = models.CharField('IMDB ID', max_length=20)

    class Meta:
        unique_together = ['user', 'imdb_id']

    def __str__(self):
        return self.imdb_id
