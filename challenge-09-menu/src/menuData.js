import { MenuNode } from './NaryTree';

const Perfil = () => <div><h2>Mi Perfil</h2><p>Información del usuario...</p></div>;
const Mensajes = () => <div><h2>Mensajes</h2><p>Bandeja de entrada...</p></div>;
const Seguridad = () => <div><h2>Seguridad y Privacidad</h2><p>Configuración de la cuenta...</p></div>;
const Pagos = () => <div><h2>Pagos</h2><p>Historial de transacciones...</p></div>;
const Notificaciones = () => <div><h2>Notificaciones</h2><p>Ajustes de notificaciones...</p></div>;
const FAQs = () => <div><h2>Preguntas Frecuentes</h2><p>Respuestas a dudas comunes...</p></div>;
const Soporte = () => <div><h2>Soporte Técnico</h2><p>Contacta a nuestro equipo...</p></div>;
const Home = () => <div><h2>Inicio</h2><p>Bienvenido al sistema.</p></div>;

export const rootMenu = new MenuNode("Menú Principal");

const perfilMenu = rootMenu.addChild(new MenuNode("Perfil", "/perfil", Perfil));
perfilMenu.addChild(new MenuNode("Seguridad y Privacidad", "/perfil/seguridad", Seguridad));
perfilMenu.addChild(new MenuNode("Pagos", "/perfil/pagos", Pagos));
perfilMenu.addChild(new MenuNode("Notificaciones", "/perfil/notificaciones", Notificaciones));

rootMenu.addChild(new MenuNode("Mensajes", "/mensajes", Mensajes));

const ayudaMenu = rootMenu.addChild(new MenuNode("Ayuda"));
ayudaMenu.addChild(new MenuNode("FAQs", "/ayuda/faqs", FAQs));
ayudaMenu.addChild(new MenuNode("Soporte", "/ayuda/soporte", Soporte));

rootMenu.addChild(new MenuNode("Inicio", "/inicio", Home));