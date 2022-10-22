import numpy as np
import pandas as pd

def master_calculator(source_id: str,
                      target_id: str,
                      category: str,
                      currencies_by_country: dict,
                      exchange_rate_info: list,
                      country_category_ppp_data) -> float:
    """
    Function to calculate living costs in different countries
    
    Inputs:
    source_id: Source country identifier e.g.: 'hu'
    
    target_id: Target country identifier e.g.: 'at'
    
    category: Living expense category to be compared
    
    currencies_by_country: Dictionary listing currency
    unit in each country. Keys are country IDs
    
    exchange_rate_info: Wise API response, listing
    exchange rates in different currencies/countries
    
    country_category_ppp_data: Dataframe containing
    the PPP (compared to EU27 avg) in each country
    
    Returns:
    price_ratio: (float) multiplier for living expenses
    price_ratio > 1: home country more expensive
    price_ratio < 1: home country cheaper
    """

    # Retrieve PPP values
    home_ppp = country_category_ppp_data[
        country_category_ppp_data["country_id"] == source_id
        & country_category_ppp_data["category"] == category]["value"].iloc[0]

    foreign_ppp = country_category_ppp_data[
        country_category_ppp_data["country_id"] == target_id
        & country_category_ppp_data["category"] == category]["value"].iloc[0]

    # Retrieve currency conversion info
    exchange_ratio = exchange_rate_finder(exchange_rate_info,
        currencies_by_country[target_id],
        currencies_by_country[source_id])

    # Do calculation
    price_ratio = home_ppp / foreign_ppp * exchange_ratio
    return price_ratio

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
        if exchange_info["source"] == source and exchange_info["target"] == target:
            return exchange_info["rate"]

    # Raise error if not found
    raise ValueError("Target and/or source currency exchange information doesn't exist in data")


def master_calculator(source_id: str,
                      target_id: str,
                      category: str,
                      currencies_by_country: dict,
                      exchange_rate_info: list,
                      country_category_ppp_data: pd.Dataframe) -> float:
    """
    Function to calculate living costs in different countries
    
    Inputs:
    source_id: Source country identifier e.g.: 'hu'
    
    target_id: Target country identifier e.g.: 'at'
    
    category: Living expense category to be compared
    
    currencies_by_country: Dictionary listing currency
    unit in each country. Keys are country IDs
    
    exchange_rate_info: Wise API response, listing
    exchange rates in different currencies/countries
    
    country_category_ppp_data: Dataframe containing
    the PPP (compared to EU27 avg) in each country
    
    Returns:
    price_ratio: (float) multiplier for living expenses
    price_ratio > 1: home country more expensive
    price_ratio < 1: home country cheaper
    """

    # Retrieve PPP values
    home_ppp = country_category_ppp_data[
        country_category_ppp_data["country_id"] == source_id
        & country_category_ppp_data["category"] == category]["value"].iloc[0]

    foreign_ppp = country_category_ppp_data[
        country_category_ppp_data["country_id"] == target_id
        & country_category_ppp_data["category"] == category]["value"].iloc[0]

    # Retrieve currency conversion info
    exchange_ratio = exchange_rate_finder(exchange_rate_info,
        currencies_by_country[target_id],
        currencies_by_country[source_id])

    # Do calculation
    price_ratio = home_ppp / foreign_ppp * exchange_ratio
    return price_ratio