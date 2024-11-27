import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ConfirmModal from '@/components/ConfirmModal.vue';

describe('ConfirmModal.vue', () => {
  it('Renderiza o modal quando "show" está definido como true', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
        title: 'Título de Teste',
        message: 'Mensagem de Teste',
      },
    });
    expect(wrapper.find('.fixed').isVisible()).toBe(true);
  });

  it('Não renderiza o modal quando "show" está definido como false', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: false,
      },
    });
    expect(wrapper.find('.fixed').exists()).toBe(false);
  });

  it('Emite o evento "confirm" ao clicar no botão de confirmação', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
      },
    });

    const botaoConfirmar = wrapper.find('button.bg-secondary');
    await botaoConfirmar.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('confirm');
    expect(wrapper.emitted('confirm')).toHaveLength(1); // Verifica que o evento foi emitido uma vez
  });

  it('Emite o evento "cancel" ao clicar no botão de cancelamento', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        show: true,
      },
    });

    const botaoCancelar = wrapper.find('button.border-secondary');
    await botaoCancelar.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('cancel');
    expect(wrapper.emitted('cancel')).toHaveLength(1); // Verifica que o evento foi emitido uma vez
  });
});