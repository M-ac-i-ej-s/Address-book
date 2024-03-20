<template>
    <BaseDialog buttonLabel="Edit" dialogWidth="600" buttonColor="primary" :resetErrors="resetErrors" v-slot="slotProps">
        <div class="EditComponent">
            <v-text-field
                label="Name"
                variant="outlined"
                v-model="addressToEdit.name"
                class="edit-component-input"
                hide-details="auto"
            ></v-text-field>
            <span class="edit-component-error">
                {{errors.name}}
            </span>
            <v-text-field
                label="Lastname"
                variant="outlined"
                v-model="addressToEdit.lastname"
                class="edit-component-input"
                hide-details="auto"
            ></v-text-field>
            <span class="edit-component-error">
                {{errors.lastname}}
            </span>
            <v-text-field
                label="Phone"
                variant="outlined"
                v-model="addressToEdit.phone"
                class="edit-component-input"
                hide-details="auto"
            ></v-text-field>
            <span class="edit-component-error">
                {{errors.phone}}
            </span>
            <v-text-field
                label="Email"
                variant="outlined"
                v-model="addressToEdit.email"
                class="edit-component-input"
                hide-details="auto"
            ></v-text-field>
            <span class="edit-component-error">
                {{errors.email}}
            </span>
            <div class="edit-component-actions">
                <v-btn color="grey" @click="handleClear">
                    Clear
                </v-btn>
                <v-btn color="primary" @click="handleSave(slotProps.isActive)" :loading="loading">
                    Save
                </v-btn>
            </div>
        </div>
    </BaseDialog>
</template>
<script>
import BaseDialog from '../base/BaseDialog.vue'

export default {
    name: 'EditComponent',
    components: {
        BaseDialog
    },
    props: {
        address: Object,
        handleEdit: Function,
        errors: Object,
        resetErrors: Function,
    },
    data() {
        return {
            loading: false,
            addressToEdit: {
                id: this.address.id,
                name: this.address.name,
                lastname: this.address.lastname,
                phone: this.address.phone,
                email: this.address.email
            }
        }
    },
    methods: {
        handleSave(isActive) {
            this.loading = true
            this.handleEdit(this.addressToEdit)
            if(this.errors.name !== '' || this.errors.lastname !== '' || this.errors.phone !== '' || this.errors.email !== '') {
                this.loading = false
            }
            setTimeout(() => {
                isActive()
                this.loading = false
            }, 2000)
        },
        handleClear() {
            this.addressToEdit = {
                id: this.address.id,
                name: '',
                lastname: '',
                phone: '',
                email: ''
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.EditComponent {
    .edit-component-actions {
        display: grid;
        grid-template-columns: 50% 40%;
        gap: 10%;
        padding: 2.5rem 0 0 0;
        button {
            font-weight: 700;
        }
    }
    .edit-component-error {
        color: red;
        padding: 0;
        margin: 0;
        font-size: 0.8rem;
    }
    .edit-component-input {
        padding: 1.5rem 0 0 0;
    }
}
</style>