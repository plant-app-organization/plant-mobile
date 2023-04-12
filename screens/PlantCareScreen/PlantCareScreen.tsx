import React from 'react'
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'
import { useSearchOffersQuery } from '../../graphql/graphql'
import Dropdown from '../../components/dropdown/Dropdown'

import { ChevronLeftIcon } from 'react-native-heroicons/solid'

interface PlantCareScreen {}

const PlantCareScreen: React.FunctionComponent<PlantCareScreen> = (props) => {
  const [filters, setFilters] = useState<string[]>([])

  const [searchInput, setSearchInput] = useState<string>('')
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { data: searchOffersData, refetch: refetchSearchOffersData } = useSearchOffersQuery({
    variables: { searchInput, filters },
  })

  // console.log('DATA FROM REQUEST ⭐️', searchOffersData)

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => {
      refetchSearchOffersData(), setRefreshing(false)
    })
  }, [])

  const onChangeText = (text: string) => {
    if (text.length > 2) {
      console.log('go', text)
    }
    setSearchInput(text)
  }
  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }
  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={['#cfe9f1', '#eafdf4', '#FEFFFF']}
      className='w-screen h-screen flex items-center justify-center'
    >
      <SafeAreaView
        style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor='#87BC23'
              colors={['#87BC23', '#139DB8']}
            />
          }
        >
          <View className='w-full h-[100px] flex flex-row items-center justify-evenly'>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='w-[50px] h-[50px] justify-center items-center rounded-full blur-lg bg-white opacity-70'
            >
              <ChevronLeftIcon color={'black'} />
            </TouchableOpacity>
            <TextInput
              className='font-Roboto w-[70%] border-green-50 border-solid bg-white text-left rounded-2xl border ml-4 p-3'
              placeholder='Rechercher une plante'
              value={searchInput}
              onChangeText={onChangeText}
              placeholderTextColor='#000'
            />
          </View>

          <View className='h-[20px] w-full' />
          <View className='w-full bg-blue'>
            <Text className='ml-4 mb-5 text-xl font-semibold'>Comment les entretenir ?</Text>
            <Dropdown
              title="L'acceuillir"
              description={`Quand la plante  arrive il faut la placer rapidement au chaud , isoler la des autres plante pour éviter tout nuisible qui auraient pu s’établir sur elle, la déballer en toute délicatesse , couper les feuille abîmé , inspecter toute les feuille pour repérer éventuellement des maladie , utiliser de l’eau non calcaire pour de préférence pour la nettoyer.

Inspecter le substrat ( la terre )  pour voir l état de sécheresse , si c’est trop sec arrosé la si non laissé la s’acclimater quelque jour.

après 10 jours si il ya des moucherons faite un rempotage mais après 10 jours seulement pour éviter un stresse supplémentaire à la plante ,vous pouvez aussi enfin la déplacer à coté des autre plante après observation tout en gardant un œil sur elle encore quelque jours.
L’emplacement de la plante se fera en fonction de ses besoins.
             `}
            />
            <Dropdown
              title="L'arrosage"
              description={`jamais laisser d'eau stagne, éviter de trop arroser ! c’est difficile de récupérer une plante trop arrosée que pas arroser
              `}
            />
            <Dropdown
              title='La lumière'
              description={`jamais exposer une plante en plein soleil ( sauf exception )`}
            />
            <Dropdown
              title='La température'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
            <Dropdown
              title='Le rempotage'
              description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, accusantium earum. Nemo reprehenderit odit, quae similique itaque ad eligendi quas natus aliquam possimus, non quidem necessitatibus ducimus dicta aut officia.'
            />
          </View>

          <View className='h-[50px] w-full' />

          <View className='w-full'>
            <Text className='ml-4 mb-5 text-xl font-semibold'>Que se passe t'il ?</Text>
            <Dropdown
              title='Moucherons'
              description={`Comment les identifier ?

 Nuisible très facilement identifiable surtout  quand un moucherons vous tourne autour devant votre série sur netflix mais bref si non approchez vous de votre pot et vous en verrez aussi 
Les moucherons n’ont une durée de vie de seulement 4 ou 5 jours mais se reproduisent très rapidement !

S’en débarrasser !!

Laissez bien sécher votre terreau car les moucherons viennent pondre dans un terreau humide espacer vos arrosages
Placez une couche de billes d’argile ou de sable au dessus de la motte de terre afin de créer une barrière entre les moucherons et votre terreau, ce qui les empêchera de pondre de nouveau.
              `}
            />
            <Dropdown
              title='Les thrips'
              description={`Comment les identifier ?

apparition de taches ocres sur le dessous ou le dessous avec une observation de plus près vous pouvez peut  être voir des thrips grand comme un grain de riz.
Les thrips adultes peuvent voler, ils pondent leurs œufs dans le terreau, les larves se développent dans la terre avant de rejoindre les feuilles (souvent les plus jeunes pousses bien tendres) afin de les grignoter petit à petit sans aucun scrupule !

S’en débarrasser !!

dans un premier temps il faut isoler la plante pour éviter la contamination , si il ya quelques feuilles touchées coupez-les , douchez la plante de manière à enlever le max de thrips possible et nettoyez les feuilles au savon noir pendant un mois une fois par semaine. Il faut aussi changer le terreau car certaines larves risquent d’être toujours là. Les thrips détestent l’humidité.
Les thrips attaquent le plus souvent les plantes déjà affaiblies, alors gardez l œil ouvert !
              `}
            />
            <Dropdown
              title='Les araignées rouges'
              description={`Comment les identifier ?
              
De fines toiles apparaissent sur les feuilles et les tiges , ces acariens jaunissent les feuilles en suçant la sève.
          
S’en débarrasser !!
             
arroser la plante pour se débarrasser des acariens et nettoyer les feuilles avec un chiffon humide, pour éviter leur réapparition, brumiser régulièrement votre plante pour humidifier l atmosphère et nettoyez-la régulièrement.
              `}
            />

            <Dropdown
              title='Les fourmis'
              description={`Comment les identifier ?

C’est assez rapide vous les verrez très facilement sous votre pot le plus souvent.
              
Comment s’en débarrasser !!

Les fourmis ne sont pas particulièrement dangereuses pour vos plantes mais elles pourraient endommager le système racinaire donc il vaut mieux s’en débarrasser

Une astuce de grand-mère qui marche ?

Mélanger une cuillère à café de cannelle dans votre terreau de surface, les fourmis détestent ça et quitteront votre pot illico !
Mais attention elles risquent de migrer dans un autre endroit peu adapté, alors afin de guider leur migration je vous conseille de placer un second pot rempli de terreau à côté et d’attendre qu’elles se mettent dedans avant de placer le pot en extérieur.

              `}
            />
            <Dropdown
              title='Les cochenilles'
              description={`Comment les identifier ?

Les cochenilles sont plutôt faciles à reconnaître.
Si vous voyez des taches blanches sur le dessus ou le dessous de vos feuilles, que celles-ci sont recouvertes d’une matière collante, c’est très certainement une attaque de cochenilles.
Plusieurs types de cochenilles :
 - farineuses
 - carapace
 - je sais plus les autres
Apparaissent dans un environnement sec et chaud.

Comment s’en débarrasser ?

  1ère étape : retirer le max de cochenilles possible à l’aide d’un coton imbibé d’alcool à 70° ou bien tout simplement un chiffon humidifié.

  2ème étape : Préparer une solution maison : 1L d’eau température ambiante + 1 cc de savon noir liquide + 1cc d’alcool 70° + 1cc d’huile de colza.
  Vaporiser entièrement votre plante de façon à recouvrir chaque partie de feuilles dessus, dessous/ tiges, cette solution à base d’huile va permettre d’étouffer les cochenilles.
              `}
            />
            <Dropdown
              title='La rouille'
              description={`Comment l’identifier ?

Adore l’humidité de l’air, lorsque l’air ne circule pas bien, pièces pas assez aérées.
Créer des taches orange ou brunes sur les feuilles.
Peut apparaître suite à une vaporisation trop intense de vos plantes.

S’en débarrasser !!

Coupez les feuilles malades à leur base pour stopper la propagation
Vaporiser un fongicide à base de soufre (demandez conseil en jardinerie), je vous recommande le Fertiligène Fongicide Express.
Répétez l’opération chaque semaine jusqu’à que les tâches cessent d apparaître (au moins pendant 1 mois)
              `}
            />
            <Dropdown
              title='Moisissures'
              description={`Comment l’identifier ?

Survient lorsque l’arrosage est trop fréquent ou trop abondant 
Souvent lorsqu’il y a de l’eau stagnante au fond des pots/ coupelles
On s’en rend souvent compte un peu trop tard, lorsque notre plante commence à montrer des signes de fatigue, et en regardant ses racines on se rend compte que de la pourriture a commencé à apparaître
              
S’en débarrasser!
              
Tout de suite changer le substrat 
Coupez les racines atteintes
Laissez bien sécher les racines avant de les ré arroser.
              `}
            />
            <Dropdown
              title='L’oïdium'
              description={`Comment l’identifier ?

Plus présent sur les plantes extérieures comme les rosiers, il peut aussi pourtant apparaître sur nos plantes vertes d’intérieur
On observe une fine couche poudreuse blanche sur les feuilles et tiges.

S’en débarrasser !!

Isolez la plante toujours
Coupez les feuilles atteintes.
Brumiser un mélange d’eau et de lait (à 20%), le gras du lait va permettre de créer une couche protectrice sur vos feuilles.
Répétez chaque semaine pendant au moins 1 mois.
              `}
            />
          </View>

          <View className='h-[50px] w-full' />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default PlantCareScreen
