import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, registerFeatureFlag } from '@openmrs/esm-framework';
import { createDashboardLink, registerWorkspace } from '@openmrs/esm-patient-common-lib';
import { configSchema } from './config-schema';
import orderBasketActionMenuComponent from './order-basket-action-button/order-basket-action-button.extension';
import { ordersDashboardMeta } from './dashboard.meta';
import OrdersSummary from './orders-summary/orders-summary.component';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@openmrs/esm-patient-orders-app';

const options = {
  featureName: 'patient-orders',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

registerWorkspace({
  name: 'order-basket',
  title: 'Order Basket',
  load: getAsyncLifecycle(() => import('./order-basket/order-basket.workspace'), options),
  type: 'order',
  canHide: true,
});

registerFeatureFlag(
  'ordersSummary',
  'Orders Summary',
  'This feature introduces a navigation on the patient chart left nav called Orders and shows a history of patient orders within patient chart',
);

export const orderBasketActionMenu = getSyncLifecycle(orderBasketActionMenuComponent, options);

export const ordersDashboardLink =
  // t('Orders', 'Orders')
  getSyncLifecycle(
    createDashboardLink({
      ...ordersDashboardMeta,
      moduleName,
    }),
    options,
  );

export const ordersDashboard = getSyncLifecycle(OrdersSummary, options);
