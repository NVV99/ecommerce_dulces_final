# Manual de Usuario y Despliegue

## 1. Instalación local
1. Descomprime `ecommerce_dulces_final.zip`.
2. Ve a `/backend/`:
   ```bash
   npm install
   cp .env.example .env
   ```
3. Rellena `.env` con tus credenciales:
   ```
   DB_HOST=...
   DB_USER=...
   DB_PASS=...
   DB_NAME=...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLIC_KEY=pk_test_...
   # Para webhook
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
4. Importa la base de datos:
   ```bash
   npm run seed
   ```
5. Inicia el servidor:
   ```bash
   npm start
   ```

## 2. Pruebas
- Navega a http://localhost:5000/products.html
- Verifica catálogo, modal de detalles y stock
- Añade productos al carrito y realiza checkout
- Revisa creación de pedido en BBDD con estado "pendiente"
- Inicia sesión como admin y cambia estado de pedido
- Verifica historial en `/api/orders/user`
- Envía formulario de contacto

## 3. Despliegue en Render
1. Sube el repo a GitHub.
2. En Render: New → Web Service → GitHub repo.
3. Configura Environment:
   - Variables del `.env`
4. Deploy.
5. La app estará en `https://<tu-app>.onrender.com`.

## 4. Webhook Stripe (opcional)
1. En Stripe Dashboard → Developers → Webhooks → + Add endpoint.
2. Endpoint URL: `https://<tu-app>.onrender.com/api/webhook`
3. Evento: `checkout.session.completed`
4. Copia el Signing secret y ponlo en `.env` como `STRIPE_WEBHOOK_SECRET`.
5. Guarda y el servidor recibirá notificaciones automáticas.

## 5. Comprobación final
- Pago test en Stripe: pedido pasa a "pagado".
- Formulario de contacto crea registro en BBDD.
- El stock se ajusta tras cada pedido.
