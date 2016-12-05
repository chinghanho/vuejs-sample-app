function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format('MM/DD/YYYY hh:mm:ss')
  }
})

var list = Vue.component('task-list', {
    template: `
        <div>
            <li v-for="task in tasks">
                <input type="checkbox" v-model="task.done" @click="updateDoneAt(task)" />
                <input type="text" v-model="task.body" />
                {{ task.done_at | formatDate }}
            </li>
        </div>
    `,

    props: ['tasks'],

    methods: {

        updateDoneAt: function (task) {

            task.done = !task.done
            task.done_at = task.done ? new Date() : null

            this.$emit('save')
        }

    }
})


var defaultTasks = [
    { body: 'Go to the store', done: false, done_at: null },
    { body: 'Go to the window', done: false, done_at: null },
    { body: 'Go to work', done: true, done_at: randomDate(new Date(2012, 0, 1), new Date) },
    { body: 'Go to movie', done: false, done_at: null },
]

var tasks = JSON.parse(localStorage.getItem('tasks')) || defaultTasks

var app = new Vue({
    el: '#root',

    data: { tasks: tasks },

    computed: {

        incompleteTasks: function () {
            return this.tasks.filter(task => ! task.done)
        },

        completeTasks: function () {
            return this.tasks.filter(task => task.done)
        }

    },

    methods: {
        save: function () {
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
    }

})

app.save()
