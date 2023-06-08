import { shallowMount, createLocalVue } from '@vue/test-utils'
import Guestbook from '../pages/guestbook/index.vue'


const localVue = createLocalVue()

localVue.prototype.$http = {
  $get: jest.fn(),
  post: jest.fn()
}

describe('Guestbook', () => {
  it('fetches entries on created', async () => {
    const entries = [{ id: 1, email: 'test@example.com', title: 'Test', text: 'Test entry' }]
    localVue.prototype.$http.$get.mockResolvedValue(entries)

    const wrapper = shallowMount(Guestbook, { localVue })

    await wrapper.vm.$nextTick()

    expect(localVue.prototype.$http.$get).toHaveBeenCalledWith('/api/entries')
    expect(wrapper.vm.entries).toEqual(entries)
  })

  it('submits a form when the form is valid', async () => {
    const wrapper = shallowMount(Guestbook, { localVue })

    wrapper.setData({ email: 'test@example.com', title: 'Test', message: 'Test message' })

    localVue.prototype.$http.post.mockResolvedValue({})

    await wrapper.vm.submitForm()

    expect(localVue.prototype.$http.post).toHaveBeenCalledWith('/api/entries', {
      email: 'test@example.com',
      title: 'Test',
      text: 'Test message'
    })
  })
})

