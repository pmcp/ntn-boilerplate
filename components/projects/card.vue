<template>
  <div>

    <div v-if="action">


      <div class="flex flex-col overflow-hidden container mx-auto">


        <FormulateForm v-model="actionForm" @submit="handleForm">
        <div
          class="flex-1  p-6 flex flex-col justify-between rounded border-2 "
          style="border-color:#009de0; background-color: #FAFDFF"
        >
          <div class="flex-1 flex flex-col justify-between font-light ">
            <div class="flex-1">
              <p class="text-xl">
                <span class="font-semibold">Observatie: </span>
                <span class="text-md py-2 italic">
                  {{ action.observation.text }}
                </span>
              </p>
            </div>
          </div>

          <div class="flex-1 pt-4 flex flex-col justify-between font-light">
            <div class="flex-1">



                <FormulateInput
                  type="textarea"
                  name="text"
                >
                  <template #label="{ id }">
                    <div>
                    <span class="font-semibold">Actie: </span>

            </div>
                  </template>
                </FormulateInput>
<!--                <span v-else class="text-md py-2 italic">Niet bepaald</span>-->

            </div>
          </div>

          <div class="flex-1 pt-4 flex flex-col justify-between font-light">
            <div class="flex-1">

              <FormulateInput
                type="text"
                name="owner"
              >
                <template #label="{ id }">
                  <div>
                    <span class="font-semibold">Toegewezen aan: </span>

                  </div>
                </template>
              </FormulateInput>




            </div>
          </div>

          <div class="flex-1 pt-4 flex flex-col justify-between font-light">
            <div class="flex-1">


              <FormulateInput
                type="text"
                name="owner"
              >
                <template #label="{ id }">
                  <span class="font-semibold">Status: </span>
                </template>
              </FormulateInput>

            </div>
          </div>
          <FormulateInput
            type="submit"
            :disabled="status != 0"
            :wrapper-class="['btn']"
          >
            <template>
              <div>
                <span v-if="status === 0">Opslaan</span>
                <span v-else-if="status === 1">Even geduld...</span>
                <span v-else-if="status === 2">Verstuurd!</span>
              </div>
            </template>
          </FormulateInput>

        </div>
        </FormulateForm>
        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <p class="text-xl text-gray-900">
            <span class="font-semibold">Context</span>
          </p>
        </div>

        <div class="flex-shrink-0" v-if="videoReady">
          <youtube
            class="embed-container"
            :video-id="action.session.videoId"
            @ready="ready"
            :player-vars="{ start: action.session.videoStartTime }"
          ></youtube>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Moment</span>
              <span class="italic"></span>
            </p>

            <p class="text-md text-gray-500 py-2">
              {{ action.action.context }}
            </p>
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900 pb-5">
              <span class="font-semibold">Halte in wandeling </span>
            </p>
            <ol class="overflow-hidden">
              
              <li
                class="relative pb-10"
                v-for="(p, key) in phases"
                :key="`phase-${key}`"
              >
                <template v-if="key  == action.phase.order">
                  <div
                    v-if="key != Object.keys(phases).length - 1"
                    class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  ></div>
                  <div class="relative flex items-start group">
                    <span class="h-9 flex items-center">
                      <span
                        class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full"
                        style="background-color: #009de0"
                      >
                        <svg
                          class="w-5 h-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </span>
                    <span class="ml-4 min-w-0 flex flex-col">
                      <span
                        class="text-xs font-semibold tracking-wide uppercase"
                        >{{ p.Naam }}</span>
                      <span class="text-sm text-gray-500">{{ p.Beschrijving }}</span>
                    </span>
                  </div>
                </template>
                <template v-else>
                  <!-- Complete Step -->
                  <div
                    v-if="key != Object.keys(phases).length - 1"
                    class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  ></div>
                  <a
                    href="#"
                    class="relative flex items-start group"
                    aria-current="step"
                  >
                    <span class="h-9 flex items-center" aria-hidden="true">
                      <span
                        class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 rounded-full"
                        style="border-color: #009de0"
                      >
                        <span
                          class="h-2.5 w-2.5 rounded-full"
                          style="background-color: #009de0"
                        ></span>
                      </span>
                    </span>
                    <span class="ml-4 min-w-0 flex flex-col">
                      <span
                        class="text-xs font-semibold tracking-wide uppercase"
                        >{{ p.Naam }}</span
                      >
                      <span class="text-sm text-gray-500">{{ p.Beschrijving }}</span>
                    </span>
                  </a>
                </template>
              </li>
            </ol>
            <!-- 
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Fase:</span> {{ action.phase.order }}.
              {{ action.phase.name }}
            </p>
            <p class="text-md text-gray-500 py-2">{{ action.phase.descr }}</p> -->
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Testpersoon:</span>
              {{ action.user.name }}, {{ action.user.age }} jaar
            </p>
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Persona:</span>
              {{ action.persona.name }}
            </p>
            <p class="text-md text-gray-500 py-2">
              {{ action.persona.descr }}
            </p>
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Uitgevoerd op: </span>
              <time datetime="2020-03-16">{{ action.session.date }}</time>
            </p>
          </div>
        </div>
        <!-- <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Stakeholder:</span>
              {{ action.stakeholder.name }}, {{ action.stakeholder.division }}
            </p>
          </div>
        </div> -->
      </div>
    </div>
    <div v-else class="py-32 flex justify-center items-center">
      Selecteer een observatie
    </div>
  </div>
</template>
<!-- https://docs.google.com/spreadsheets/d/1hmVDMigpP_4vemHCFR4RKFdJVp30FCLqXa-_xLEzi1M/edit?usp=sharing -->
<!-- https://docs.google.com/spreadsheets/d/e/2PACX-1vTqMPRdrHj-Gdye1pjLYDBULmRs58bHy3U_4gO7_nL7DWgGrJ_m7ew0C2j48Uyy-8Jgpsok9StF1KBu/pubhtml -->
<script>
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed';
import { mapActions } from 'vuex'

// import VueHtml2pdf from 'vue-html2pdf';
export default {
  name: 'Card',
  props: {
    spreadSheetId: {
      type: String,
      default: function () {
        return '';
      },
    },
    activeCard: {
      type: Object,
      default: function () {
        return {};
      },
    },
    phases: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data: function () {
    return {
      action: null,
      videoReady: false,
      player: null,
      actionForm: {}
    };
  },
  watch: {
    activeCard: function (newVal) {

      this.parseData(newVal);
    },
  },
  computed: {
    status() {
      return this.$store.state.sheets.status
    }
  },
  methods: {
    ...mapActions({
      sendFormData: 'sheets/sendFormData',
    }),
    handleForm(data){

      this.sendFormData({spreadSheetId: this.spreadSheetId, actionData: data, activeCard: this.activeCard})
    },
    ready (player) {
      this.player = player
      this.isLoaded = true
    },
    // generateReport() {
    //   this.$refs.html2Pdf.generatePdf();
    // },


    parseData(entry) {
      this.action = null;
      this.videoReady = false
      // Using vue-youtube-embed to get id and time (https://github.com/kaorun343/vue-youtube-embed)
      
      const videoId = getIdFromURL(entry['Moment Video']);
      const videoStartTime = getTimeFromURL(entry['Moment Video']);
      console.log(videoStartTime)
      // console.log(entry);
   const action = {
     id: entry.Id,
     report: {
       text: entry['Moment Beschrijving'],
     },
     phase: {
       order: entry['Fase Nummer'],
       name: entry['Fase Naam'],
       descr: entry['Fase Beschrijving'],
     },
     observation: {
       text: entry['Opmerking'],
       context: entry['Moment Id'],
     },
     action: {
       text: entry['Actie'],
       context: entry['Moment Beschrijving'],
     },
     persona: {
       name: entry['Persona Naam'],
       descr: entry['Persona Beschrijving'],
     },
     session: {
       videoId: videoId,
       videoStartTime: videoStartTime,
       date: entry['Sessie Datum'],
       
     },
     user: {
       name: entry['Gebruiker Naam'],
       age: entry['Gebruiker Leeftijd'],
       // 'email': entry.gsx$.$t,
     },
     stakeholder: {
       name: entry['Stakeholder Naam'],
       email: entry['Stakeholder Email'],
       division: entry['Stakeholder Afdeling'],
       // 'email': entry.gsx$.$t,
     },
     owner: {
        name: entry['Verantwoordelijke'],
        status: entry['Timing'],
        timing: entry['Status'],
        // 'email': entry.gsx$.$t,
      },
   };

      this.action = action;
      if(this.player) this.player.target.seekTo(this.action.session.videoStartTime)

      this.videoReady = true;


      //Set form
      this.actionForm = {
        text: this.action.action.text,
        owner: this.action.owner.name,
        status: this.action.owner.status
      }
      // this.actions.push(action);

      // });
      //
      //         // Push entry into the list of quotes

      // this.actions = val;
    },
  },
};
</script>
<style>
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
