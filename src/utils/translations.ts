export const translations = {
  es: {
    // Auth
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    phone: 'Teléfono',
    firstName: 'Nombre',
    lastName: 'Apellido',
    forgotPassword: '¿Olvidaste tu contraseña?',
    dontHaveAccount: '¿No tienes cuenta?',
    alreadyHaveAccount: '¿Ya tienes cuenta?',

    // Home
    dashboard: 'Dashboard',
    helloUser: 'Hola',
    totalBalance: 'Saldo Total',
    myCards: 'Mis Tarjetas',
    addCard: 'Agregar Tarjeta',
    recentTransactions: 'Transacciones Recientes',

    // Tarjetas
    cards: 'Tarjetas',
    addNewCard: 'Agregar Nueva Tarjeta',
    cardNumber: 'Número de Tarjeta',
    expiryDate: 'Vencimiento',
    cvv: 'CVV',

    // Gastos
    expenses: 'Gastos',
    newExpense: 'Nuevo Gasto',
    scanReceipt: 'Escanear Factura',

    // Finanzas Compartidas
    sharedFinances: 'Finanzas Compartidas',
    addPartner: 'Agregar Pareja',
    splitExpense: 'Dividir Gasto',
    pending: 'Pendiente',
    paid: 'Pagado',

    // Perfil
    profile: 'Perfil',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',

    // Validaciones
    requiredField: 'Este campo es obligatorio',
    invalidEmail: 'Email inválido',
    passwordMismatch: 'Las contraseñas no coinciden',
    invalidPhone: 'Teléfono inválido',
  },
  en: {
    // Auth
    login: 'Sign In',
    register: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phone: 'Phone',
    firstName: 'First Name',
    lastName: 'Last Name',
    forgotPassword: 'Forgot your password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',

    // Home
    dashboard: 'Dashboard',
    helloUser: 'Hello',
    totalBalance: 'Total Balance',
    myCards: 'My Cards',
    addCard: 'Add Card',
    recentTransactions: 'Recent Transactions',

    // Cards
    cards: 'Cards',
    addNewCard: 'Add New Card',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',

    // Expenses
    expenses: 'Expenses',
    newExpense: 'New Expense',
    scanReceipt: 'Scan Receipt',

    // Shared Finances
    sharedFinances: 'Shared Finances',
    addPartner: 'Add Partner',
    splitExpense: 'Split Expense',
    pending: 'Pending',
    paid: 'Paid',

    // Profile
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Sign Out',

    // Validations
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email',
    passwordMismatch: 'Passwords do not match',
    invalidPhone: 'Invalid phone number',
  },
};

export type Language = 'es' | 'en';
