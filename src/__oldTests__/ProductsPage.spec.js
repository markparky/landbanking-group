import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as renderer from 'react-test-renderer';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import ProductsPage from './ProductsPage';

jest.mock('../components/analytics/withAnalytics', () => ({
  withAnalytics: jest.fn(() => component => component),
  withAnalyticsOnEvent: jest.fn(),
  sendAnalyticsOnPageLoad: jest.fn()
}));

const mockStore = configureStore();

describe('Products page', () => {
  const cases = [
    {
      description: 'Standard product page'
    },
    {
      description: 'Standard product page with affiliate button',
      affiliatesEnabled: true
    },
    {
      description:
        'Standard product page with affiliate button hidden - SAM 1 edge case',
      affiliatesEnabled: true,
      affiliatesHidePartner: true
    }
  ];

  cases.forEach(({ description, affiliatesEnabled, affiliatesHidePartner }) => {
    it(`snapshot - ${description}`, () => {
      const store = mockStore({
        router: {
          location: { pathname: 'current' },
          previousLocation: { pathname: 'previous' }
        },
        config: {
          queryParams: {},
          sonic: {
            theme: {
              productsPageHeaderLogo: 'foo'
            },
            pages: {
              productsPage: {
                originPackages: {
                  Premium: {
                    excludeProductsByAlias: ['free']
                  },
                  Sport: {
                    excludeProductsByAlias: ['free', 'premium']
                  }
                }
              }
            },
            affiliates: {
              enabled: affiliatesEnabled,
              hidePartnersPage: affiliatesHidePartner
            }
          }
        },
        auth: {
          user: {
            attributes: {}
          }
        },
        products: {
          productsList: []
        },
        userSubscriptions: {
          data: [
            {
              attributes: { status: 'ACTIVE' },
              id: 1
            }
          ]
        },
        changeSubscription: {}
      });

      const props = {
        match: {
          params: {
            origin: 'someparam'
          }
        }
      };

      const component = renderer
        .create(
          <Provider store={store}>
            <Router initialEntries={['/products']}>
              <Switch>
                <Route
                  path="/products"
                  render={() => <ProductsPage {...props} />}
                />
                <Route path="/register" render={() => 'redirected'} />
              </Switch>
            </Router>
          </Provider>
        )
        .toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
