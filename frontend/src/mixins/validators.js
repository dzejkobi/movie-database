
export default {
  methods: {
    isRequiredValidator (value) {
      if (value) {
        value = `${value}`.trim()
      }
      return value ? true : 'This field is required'
    }
  }
}
