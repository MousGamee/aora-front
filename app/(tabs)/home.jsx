import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { SearchInput, Trending, VideoCard } from '../../components'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const [refreshing, setRefreshing] = useState(false)


  const onRefresh = async () => {
    setRefreshing(true)

    // re call videos -->

    setRefreshing(false)
  }

 
console.log(posts.creator)
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
         data={posts}
        keyExtractor={item => item.$id}
        
        renderItem={({ item }) => {
          console.log('creator ==>', item.creator.username)
          return (
            <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator?.username}
            avatar={item.creator.avatar}
          />
            )
        }}

        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcom back</Text>
                <Text className="text-2xl font-psemibold text-white">Mousgamee</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
            {/* search bar */}
            <SearchInput />
            {/* latest videos section */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest videos</Text>
              <Trending posts={[{ id: 1 }, { id: 2 }] ?? []} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState title={'be the first one to upload video'} subtitle="no videos found" />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home