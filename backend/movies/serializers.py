from rest_framework import serializers

from .models import Favourite


class FavouriteSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        favourite = Favourite(
            imdb_id=validated_data['imdb_id'],
            user=self.context['request'].user
        )
        favourite.save()
        return favourite

    class Meta:
        model = Favourite
        fields = ['id', 'imdb_id']
