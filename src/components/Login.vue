<template>
  <div class="block" @click.prevent.stop="check__inputs()">
    <div class="block__elem1"></div>
    <div class="block__elem2">
      <form class="login-form">
        <div class="form__title">Acesse o Nubank PJ</div>
        <div class="form__label">CPF</div>
        <input
          type="text"
          v-mask="'###.###.###-##'"
          v-model="cpf"
          @click.prevent.stop="cpf__input__focus += 1"
          class="form__input"
        />
        <div class="form__label form_alert"
        v-if="cpf__input__focus >= 1 && !cpf">{{ errors[1].required_field }}</div>
        <div class="form__label form_alert"
        v-else-if="cpf__input__focus >= 1 && check__cpf === false">
        {{ errors[2].invalid__cpf }}
      </div>
        <div class="form__label form_alert"
        v-else-if="cpf.length === 14 && check__cpf === false">{{ errors[2].invalid__cpf }}</div>
        <div class="form__label">Senha</div>
        <div class="form__password">
          <input
          :type="this.password_type"
          class="form__input password"
          v-model="password"
          @click.prevent.stop="password__input__focus += 1" />
          <div :class="form__icon_class" @click="show_password()"></div>
        </div>
        <div class="form__label"
        v-if="password__to_String.length >= 8 || (!password && password__input__focus === 0)">
          {{ default__password__label }}
        </div>
        <div class="form__label form_alert"
        v-else-if="!password && password__input__focus >= 1 ">
          {{ errors[1].required_field }}
        </div>
        <div class="form__label form_alert"
        v-else-if="password__to_String.length < 8 && password__input__focus >= 1 ">
          {{ errors[0].min__length }}
        </div>
        <a href="#" class="form__link">Esqueci a senha</a>
        <button type="button" class="form__button form__button--disabled"
        v-if="check__cpf === false || password__to_String.length< 8">
          Acessar ➔
        </button>
        <button type="button" 
        class="form__button" 
        @click.prevent.stop="this.sucessful__login()" v-else>
          Acessar ➔
        </button>
      </form>
      <div class="footer">
        <div class="footer__elem1">
          <a href="#" class="footer__link">Não sou cliente</a>
        </div>
        <div class="footer__elem2">
          <a href="#" class="footer__link">Me roubaram</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      cpf: '',
      password: '',
      errors: [
        { min__length: 'A senha deve ter oito digitos ou mais' },
        { required_field: 'Este campo é obrigatório' },
        { invalid__cpf: 'CPF inválido' },
      ],
      default__password__label:
        'Use a senha de acesso ao app, com 8 letras e/ou números',
      password_type: 'password',
      form__icon_class: [
        'form__icon',
        { form__icon_show: false },
        { form__icon_hide: true },
      ],
      cpf__input__focus: 0,
      password__input__focus: 0,
    };
  },
  methods: {
    show_password() {
      const vm = this;
      if (vm.form__icon_class[2].form__icon_hide === true) {
        vm.form__icon_class[2].form__icon_hide = false;
        vm.form__icon_class[1].form__icon_show = true;
        vm.password_type = 'text';
      } else {
        vm.form__icon_class[1].form__icon_show = false;
        vm.form__icon_class[2].form__icon_hide = true;
        vm.password_type = 'password';
      }
    },
    cpf__validator(cpf) {
      let soma = 0;
      let resto;

      const strCPF = String(cpf).replace(/[^\d]/g, '');

      if (strCPF.length !== 11) {
        return false;
      }

      if (
        [
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999',
        ].indexOf(strCPF) !== -1
      ) {
        return false;
      }

      for (let i = 1; i <= 9; i += 1) { // eslint-disable-next-line
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      }

      resto = (soma * 10) % 11;
      // eslint-disable-next-line
      if (resto == 10 || resto == 11) {
        resto = 0;
      }
      // eslint-disable-next-line
      if (resto !== parseInt(strCPF.substring(9, 10))) {
        return false;
      }

      soma = 0;

      for (let i = 1; i <= 10; i += 1) { // eslint-disable-next-line
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      }

      resto = (soma * 10) % 11;
      // eslint-disable-next-line
      if (resto == 10 || resto == 11) {
        resto = 0;
      }
      // eslint-disable-next-line
      if (resto != parseInt(strCPF.substring(10, 11))) {
        return false;
      }

      return true;
    },
    sucessful__login() {
      alert('Login feito com sucesso!');
    },
  },
  computed: {
    check__cpf() {
      const vm = this;
      return vm.cpf__validator(vm.cpf);
    },
    password__to_String() {
      const vm = this;
      return vm.password.toString();
    },
  },
};
</script>

<style scoped>
.block {
  display: flex;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.block__elem1 {
  background-image: url(https://images.pexels.com/photos/6969649/pexels-photo-6969649.jpeg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 50%;
}

.block__elem2 {
  height: 100vh;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
}

.login-form {
  align-content: center;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
  height: 75vh;
  width: 25rem;
  padding: 24px;
}

.form__title {
  font-weight: bold;
  font-size: 28px;
}

.form__label {
  color: rgb(80, 80, 80);
  font-size: 14px;
  font-weight: 600;
  padding: 15px 0;
}

.form_alert {
  color: red;
}

.form__input {
  width: 100%;
  padding: 10px 0;
  font-size: 25px;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid rgba(80, 80, 80, 0.356);
  caret-color: rgb(130, 10, 209);
}

.form__input:focus-visible {
  outline: none;
}

.form__password {
  display: flex;
  justify-content: end;
}

.form__icon {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 28px;
  height: 28px;
  position: absolute;
  cursor: pointer;
}

.form__icon_hide {
  background-image: url(https://cdn-icons-png.flaticon.com/128/3495/3495857.png);
}

.form__icon_show {
  background-image: url(https://cdn-icons-png.flaticon.com/128/3495/3495850.png);
}

.form__link {
  text-decoration: none;
  color: rgb(130, 10, 209);
  font-weight: 600;
  padding: 10px;
}

.form__button {
  width: 100%;
  height: 56px;
  background-color: rgb(130, 10, 209);
  color: white;
  border: none;
  border-radius: 30px;
  margin-top: 20px;
  font-weight: bold;
  font-size: 15px;
}

.form__button:hover {
  background-color: rgba(129, 10, 209, 0.637);
}

.form__button--disabled {
  background-color: rgb(239, 239, 239);
  color: rgba(80, 80, 80, 0.404);
  cursor: not-allowed;
}

.footer {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(239, 239, 239);
}

.footer__link {
  text-decoration: none;
  color: rgb(130, 10, 209);
  font-weight: 600;
}
@media screen and (min-height: 500px) {
  body {
    overflow-y: scroll;
  }
}

@media screen and (max-width: 1024px) {
  .block__elem1 {
    display: none;
  }

  .block__elem2 {
    width: 100%;
  }
}
</style>
