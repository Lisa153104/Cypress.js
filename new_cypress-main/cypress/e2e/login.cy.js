import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
        });

    it('Позитивный кейс авторизации', function () {
         cy.get(main_page.email).type(data.login); //Ввести правильный логин
         cy.get(main_page.password).type(data.password); //Ввести правильный пароль
         cy.get(main_page.login_button).click(); //Нажать войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); //Проверить нужный текст и наличие кнопки крестик
     })
     it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); //Нажать «Забыли пароль»
        cy.get(recovery_password_page.email).type(data.login);//Ввести любой имейл
        cy.get(recovery_password_page.send_button).click();//Проверка, что получили нужный текст и есть кнопка крестика
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');//Проверка, что получили нужный текст и есть кнопка крестика
    })
    it('Негативный кейс авторизации, неверный пароль', function () {
        cy.get(main_page.email).type(data.login);// Ввести правильный логин
        cy.get(main_page.password).type('ioveqstudio');//Ввести НЕправильный пароль
        cy.get(main_page.login_button).click();//Нажать войти
        cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверить нужный текст и наличие кнопки крестик
    })
    it('Негативный кейс авторизации, неверный логин', function () {
        cy.get(main_page.email).type('geran@dolnikov.ru');//Ввести НЕправильный логин
        cy.get(main_page.password).type(data.password);//Ввести правильный пароль
        cy.get(main_page.login_button).click();//Нажать войти
       cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверить нужный текст и наличие кнопки крестик
    })
    it('Негативный кейс авторизации, логин без @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');//Ввести логин без @
        cy.get(main_page.password).type(data.password);//Ввести правильный пароль
        cy.get(main_page.login_button).click();//Нажать войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');//Проверить, что получаем текст с ошибкой
 })

 it('Приведение к строчным буквам в логине', function () {
    cy.get(main_page.email).type('GerMan@Dolnikov.ru');//Ввести логин GerMan@Dolnikov.ru
    cy.get(main_page.password).type(data.password);//Ввести правильный пароль
    cy.get(main_page.login_button).click();//Нажать войти
   cy.get(result_page.title).contains('Авторизация прошла успешно');//Проверить, что авторизация успешна
})

})

 
