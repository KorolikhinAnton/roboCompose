<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center img-180">
        <img src="../static/node.png">
        <img src="../static/elasticsearch.svg">
        <img src="../static/docker.svg">
        <logo/>
      </div>
      <v-card>
        <v-card-title class="headline">
          DriverPack test A.Korolikhin
        </v-card-title>
        <v-card-text>
          Type the question and we'll find possible solutions:
        </v-card-text>
        <v-card-text>
          <v-autocomplete
            :filter="x=>x"
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="Description"
            item-value="API"
            label="Public API"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-expand-transition>
          <v-list v-if="model">
            <v-list-item
              v-for="(field, i) in fields"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="field.key+'.'"></v-list-item-title>
                <v-list-item-subtitle v-text="field.value"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expand-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!model"
            color="grey darken-3"
            @click="model = null"
          >
            Clear
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    import Logo from '~/components/Logo.vue'

    export default {
        components: {
            Logo
        },
        data: () => ({
            descriptionLimit: 120,
            entries: [],
            count: 0,
            isLoading: false,
            model: null,
            search: null
        }),
        computed: {
            fields () {
                if (!this.model) return [];
                return this.model.solutions.map((item,index) => {
                    return {
                        key: index+1,
                        value: item || 'n/a',
                    }
                });
            },
            items () {
                return this.entries.map(entry => {
                    const Description = entry.symptom.length > this.descriptionLimit
                        ? entry.symptom.slice(0, this.descriptionLimit) + '...'
                        : entry.symptom;

                    return Object.assign({}, entry, { Description })
                })
            },
        },
        watch: {
            search (val) {
                // Items have already been loaded
                // if (this.items.length > 0) return;

                // Items have already been requested
                if (this.isLoading) return;

                this.isLoading = true;

                // Lazily load input items
                fetch(`http://localhost:3000/symptoms?text=${val}&limit=100&page=0`)
                    .then(res => res.json())
                    .then(res => {
                        if (!res.success)
                            return;
                        const { results, values } = res.data;
                        // return;
                        this.count = results;
                        this.entries = values;
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => (this.isLoading = false))
            },
        }
    }
</script>
<style>
  .img-180 {
    margin-bottom: 15px;
    margin-top: 20px;
  }

  .img-180 img {
    height: 180px;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
