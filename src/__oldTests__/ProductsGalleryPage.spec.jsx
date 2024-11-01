import React from 'react';
import { shallow } from 'enzyme';
import * as reduxHooks from 'react-redux';
import {
  ProductsGalleryPage,
  ProductsGalleryPageComponent
} from './ProductsGalleryPage';
import { PricingOptions } from '../components/ProductsRedesign/PricingOptionFilter/PricingOptionFilter';
import { setSelectedOption } from '../components/products/actions';
import * as configSelectors from '../components/config/selectors';
import * as productSelectors from '../components/products/selectors';
import { products } from '../components/products/__fixtures__/store/products';
import mockMergedProducts from './__fixtures__/mergedProductsData';
import * as productThunks from '../components/products/thunks/fetchProductsData';
import { removeVoucher } from '../components/VoucherSection/actions';

function currentEventLoopEnd() {
  return new Promise(resolve => setImmediate(resolve));
}

jest.mock('../hooks/dom/UseBreakpoint', () => ({
  __esModule: true, // this property makes it work
  default: () => true
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

const header = {
  imageUrl: 'imageUrl',
  subtitle: 'Subtitle',
  title: 'Title'
};
const smallPrintButtonText = 'smallPrintButton Text';

describe('ProductsGalleryPage', () => {
  const configName = 'auth-dev';
  const state = {
    config: {
      queryParams: {
        configName
      },
      sonic: {
        affilliates: {
          enabled: true,
          hidePartnersPage: false
        }
      }
    },
    auth: {
      user: {
        attributes: {
          products: []
        }
      }
    },
    changeSubscription: {
      pricePlanPeriod: ''
    },
    products: {
      productsList: { ...products.productsList },
      productsConfig: {
        features: {
          '1': 'Watch anytime anywhere and making a bit extra longer for stuff',
          '2': 'Premium entertainment',
          '3': 'Live channels',
          '4': 'Live sports',
          '5': 'Cmore sports',
          '6': 'Liiga'
        },
        header: {
          imageUrl: 'imageUrl',
          subtitle: 'Subtitle',
          title: 'Title'
        },
        products: [
          {
            alias: 'entertainment',
            features: [1, 2]
          },
          {
            alias: 'premium',
            features: [1, 2, 3]
          },
          {
            alias: 'sport',
            features: [1, 2, 3, 4, 5, 6]
          },
          {
            alias: 'free',
            features: [1]
          }
        ],
        productsData: [],
        smallPrintButtonText: 'SmallPrintButton Text',
        whatElseDoIGetButtonText: 'WhatElseDoIGetButton Text'
      }
    }
  };

  describe('WHEN selectedOption as subscription', () => {
    let containerWithProductsData;
    beforeEach(async () => {
      containerWithProductsData = shallow(
        <ProductsGalleryPageComponent
          products={mockMergedProducts}
          selectedOption={PricingOptions.SUBSCRIPTIONS}
        />
      );
    });
    it('SHOULD not show discount', () => {
      expect(
        containerWithProductsData.find('ProductsGallery').props().showDiscount
      ).toEqual(false);
    });
    describe('AND discounts selected', () => {
      beforeEach(async () => {
        containerWithProductsData = shallow(
          <ProductsGalleryPageComponent
            products={mockMergedProducts}
            selectedOption={PricingOptions.DISCOUNTS}
          />
        );
      });
      it('SHOULD show discount', () => {
        expect(
          containerWithProductsData.find('ProductsGallery').props().showDiscount
        ).toEqual(true);
      });
    });
  });
  describe('WHEN initailised with the correct store', () => {
    const mountProductsGalleryPage = state => {
      const actionsDispatched = [];

      jest
        .spyOn(reduxHooks, 'useSelector')
        .mockImplementation(selector => selector(state));

      jest
        .spyOn(reduxHooks, 'useDispatch')
        .mockImplementation(() => action => actionsDispatched.push(action));

      jest
        .spyOn(productThunks, 'fetchProductsData')
        .mockImplementation(config => `fetchProductsData:${config}`);

      jest.spyOn(React, 'useEffect').mockImplementation(fn => fn());

      const container = shallow(<ProductsGalleryPage />);

      return {
        container,
        actionsDispatched
      };
    };

    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('AFTER products have been loaded', () => {
      beforeEach(async () => {
        await currentEventLoopEnd();
      });

      it('SHOULD match snapshot', () => {
        const { container } = mountProductsGalleryPage(state);
        expect(container).toMatchSnapshot();
      });

      it('SHOULD dispatch fetchProductsData', () => {
        const { actionsDispatched } = mountProductsGalleryPage(state);
        expect(actionsDispatched).toContainEqual(
          productThunks.fetchProductsData(configName)
        );
      });

      it('SHOULD dispatch removeVoucher', () => {
        const { actionsDispatched } = mountProductsGalleryPage(state);
        expect(actionsDispatched).toContainEqual(removeVoucher());
      });

      it('dispatches setSelectedOption with the default selected package', () => {
        const selectedPackage = PricingOptions.SUBSCRIPTIONS;

        jest
          .spyOn(productSelectors, 'defaultSelectedPackageSelector')
          .mockImplementation(() => selectedPackage);

        const appState = { ...state, config: { queryParams: {} } };
        const { actionsDispatched } = mountProductsGalleryPage(appState);

        expect(actionsDispatched).toContainEqual(
          setSelectedOption(selectedPackage)
        );
      });

      it('dispatches setSelectedOption with the user selected package', () => {
        const selectedPackage = PricingOptions.DISCOUNTS;

        jest
          .spyOn(configSelectors, 'queryParamsPackageSelector')
          .mockImplementation(() => selectedPackage);

        const appState = { ...state, config: { queryParams: {} } };
        const { actionsDispatched } = mountProductsGalleryPage(appState);

        expect(actionsDispatched).toContainEqual(
          setSelectedOption(selectedPackage)
        );
      });
    });
  });
});

describe('ProductsGalleryPageComponent', () => {
  describe('WHEN loaded with products data', () => {
    const containerWithProductsData = shallow(
      <ProductsGalleryPageComponent
        products={mockMergedProducts}
        header={header}
        smallPrintBtnText={smallPrintButtonText}
      />
    );

    it('SHOULD match snapshot', () => {
      expect(containerWithProductsData).toMatchSnapshot();
    });
  });

  describe('WHEN loaded without products data', () => {
    const containerWithoutProductsData = shallow(
      <ProductsGalleryPageComponent />
    );

    it('SHOULD match snapshot', () => {
      expect(containerWithoutProductsData).toMatchSnapshot();
    });
  });

  describe('WHEN loaded with a single product', () => {
    const filteredProducts = mockMergedProducts.filter(product => {
      return product.alias === 'free' || product.alias === 'entertainment';
    });

    const containerWithSingleProduct = shallow(
      <ProductsGalleryPageComponent
        products={filteredProducts}
        header={header}
        smallPrintBtnText={smallPrintButtonText}
      />
    );

    it('SHOULD match snapshot', () => {
      expect(containerWithSingleProduct).toMatchSnapshot();
    });
  });
});
