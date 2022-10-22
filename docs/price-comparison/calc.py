import numpy as np
import pandas as pd


def calc_rel_prices(exchange_rate_home: float,
        exchange_rate_foreign: float,
        ppp_home: float,
        ppp_foreign: float
        ) -> float:
    """
    Function to calculate relative price indices between
    two countries

    Inputs:
    exchange_rate_home: nominal exchange rate i.e.
    units of <home country currency> = 1 EUR

    exchange_rate_foreign: nominal exchange rate i.e.
    units of x EUR = 1 <foreign country currency unit>

    (Relation: exchange_rate_home = 1/exchange_rate_foreign)

    ppp_home: Calculated purchase power parity between home country
    and EU27 i.e. how many <home country currency units> must be spent to
    purchase the same amount of goods & services in EU27 in EUR

    ppp_foreign: Calculated purchase power parity between foreign country
    and EU27 i.e. how many <foreign country currency units> must be spent to
    purchase the same amount of goods & services in foreign country in
    <feorign currency unit>

    (Relation: ppp_foreign = 1/ppp_home)
    (Note: Invert table values from here: https://appsso.eurostat.ec.europa.eu/nui/submitViewTableAction.do)

    Returns:
    price_ratio: ppp-adjusted prices between two countries
    i.e. overall price in <home_country> is <price_ratio>
    of overall price in <foreign_country>

    price_ratio > 1: home country more expensive
    price_ratio < 1: home country cheaper
    """

    price_to_eu27 = ppp_home/exchange_rate_home
    eu27_to_price = ppp_foreign/exchange_rate_foreign

    return price_to_eu27 * eu27_to_price


def calc_category_index(values, weights=None) -> float:
    """
    Function to calculate multi-category index

    Inputs:
    values: price index value for subcategory

    weights: list/numpy array of weights in index subitems
    (subcategories, optional)
    - if no weights are given, simple average will be calculated

    Returns:
    cat_index: (float) calculated index for
    main category
    => sum(weight_i * value_i)
    """

    # Deal with no weights
    if weights is None:
        weights = np.full(len(values), 1/len(values))

    # Ensure all values are given weights
    assert len(weights) == len(values)

    return np.dot(weights, values)


def exchange_rate_finder(data: list, source: str, target: str):
    """
    Function to find exchange rates between two countries
    
    Inputs:
    data: json response read-in as list of dicts from Wise
    
    source: Source currency code e.g.: HUF
    
    target: Target currency code e.g.: EUR"""

    # Iterate over currency data till we find exchange rate we need
    for exchange_info in data:
        if data["source"] == source and data["target"] == target:
            return data["rate"]

    # Raise error if not found
    raise ValueError("Target and/or source currency exchange information doesn't exist in data")