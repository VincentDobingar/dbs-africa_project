// src/pricing/components/PricingComparison.jsx

import React from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { pricingData } from "../data/pricingData";
import PriceDisplay from "./PriceDisplay";


export default function PricingComparison() {

  const { i18n } = useTranslation();

  const lang = i18n.language || "fr";


  const plans = pricingData.plans;


  // Liste de toutes les fonctionnalités
  const allFeatures = Array.from(

    new Set(

      plans.flatMap((plan) =>
        plan.features.map(
          (feature) => feature[lang]
        )
      )

    )

  );


  return (

    <section className="pricing-comparison">


      <div className="comparison-header">

        <h2>

          {lang === "fr"
            ? "Comparer les packs"
            : "Compare our plans"}

        </h2>


        <p>

          {lang === "fr"
            ? "Choisissez le pack qui correspond le mieux à vos besoins."
            : "Choose the plan that best fits your business."}

        </p>


      </div>



      <div className="comparison-table-wrapper">


        <table className="comparison-table">


          <thead>

            <tr>


              <th>

                {lang === "fr"
                  ? "Fonctionnalités"
                  : "Features"}

              </th>



              {plans.map((plan) => (

                <th key={plan.id}>


                  <div className="plan-name">

                    {plan.name[lang]}

                  </div>



                  <div className="plan-price">

                    <PriceDisplay

                      amount={plan.price.amount}

                      currency={
                        plan.price.currency || "FCFA"
                      }

                    />

                  </div>


                </th>


              ))}


            </tr>


          </thead>




          <tbody>



            {allFeatures.map((feature) => (


              <tr key={feature}>


                <td className="feature-name">

                  {feature}

                </td>



                {plans.map((plan) => {


                  const hasFeature =
                    plan.features.some(

                      (item) =>
                        item[lang] === feature

                    );



                  return (


                    <td key={plan.id + feature}>


                      {hasFeature ? (

                        <Check

                          size={20}

                          className="text-green-600"

                        />

                      ) : (

                        "—"

                      )}


                    </td>


                  );


                })}



              </tr>


            ))}



          </tbody>


        </table>


      </div>


    </section>

  );

}