<template>
  <div
    class="relative overflow-hidden w-full min-h-screen mx-auto"
  
  >
  
    <main class="mt-4 sm:mt4">
      <div class="mx-auto max-w-7xl">
        <div class="relative mb-8">
          <h2
            class=" text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
          >
            {{ post.title }}
          </h2>
          <p class="mt-4 max-w-3xl  text-xl ">
            {{ post.description }}
            
            
            <p>
            
            
          </p>
        </div>

        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div
            class=" md:max-w-2xl md:mx-auto lg:col-span-4 lg:text-left lg:flex lg:items-start"
          >
            <div v-if="Topics">
              <ul>
                <li
                  v-for="(t, key) in Topics"
                  :key="`topic-${key}`"
                  class="shadow p-5 rounded bg-white"
                >
                  <h3 class="text-lg mb-2 leading-6 font-medium text-gray-800">
                    {{ key }}
                  </h3>
                  <p class="mt-2 max-w-4xl text-sm text-gray-400">
                    {{ t.description }}
                  </p>
                  <ul class="divide-y divide-gray-200">
                    <li v-for="(c, key) in t.cards" :key="`card-${c}`">
                      
                      <button
                        @click="setActiveCard(c-1)"
                        class="block hover:bg-gray-50 w-full"
                      >
                        <div class="flex py-4">
                          
                          <div
                            v-if="Observaties[c-1]"
                          class="container mx-auto max-w-xl text-left text-sm text-gray-600"
                          
                        >
                          {{ Observaties[c-1].Opmerking }}
                        </div>
                          
                          <div>
                            <!-- Heroicon name: solid/chevron-right -->
                        <svg
                        class="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                          </div>
                        </div>
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-8">
            
            <div
            
              class="bg-white w-full sm:overflow-hidden shadow p-5 rounded bg-white"
            >
              <card :active-card="activeCard" :phases="Fases"></card>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// @ is an alias to /src
import card from '@/components/projects/card.vue';


const gsheet_url =
  'https://spreadsheets.google.com/feeds/list/1hmVDMigpP_4vemHCFR4RKFdJVp30FCLqXa-_xLEzi1M/10/public/values?alt=json';

export default {
  name: 'Project',
  async asyncData({ $content, params, error }) {
    let post;
    try {
      
      post = await $content("projects", params.project).fetch();
    } catch (e) {
      error({ message: "Project not found" });
    }
    

    return { post };
  },
  data: function () {
    return {
      activeCard: {},
    };
  },
  components: {
    card
  },
  computed: {
    Observaties(){
      return this.$store.state.sheets.Observaties
    },
  Fases(){
    return this.$store.state.sheets.Fases
  },
    ...mapGetters({
      Topics: 'sheets/ObservationsPerTopic'
    })
  
  },
  methods: {
    ...mapActions({
      // getPhases: 'sheets/getPhases',
      // getObservations: 'sheets/getObservations'
      getSheet: 'sheets/getSheet',
    }),
    setActiveCard(id) {
      console.log(id)
      
      console.log(this.Observaties)
      this.activeCard = this.Observaties[id];
    },
  },
  mounted() {
    // this.getPhases(this.post.sheet)
    // this.getObservations(this.post.sheet)
    this.getSheet({ spreadSheetId: this.post.sheet, sheet: 'Fases' })
    this.getSheet({ spreadSheetId: this.post.sheet, sheet: 'Observaties' })
    // axios.get(this.post.sheet).then((response) => {
    //   // Get Phases
    //   console.log(response)
    //   this.allCards = response.data.feed.entry;
    // });
  },
};
</script>
