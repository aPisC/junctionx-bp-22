def calc(exchange_rate_home: float,
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
    

if __name__ == "__main__":
    x = calc(500, 1, 250, 1)