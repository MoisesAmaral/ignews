/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from './home.module.scss'

//Três formas de fazer uma chamada a API
// cliente-side
// server-side
// Static Site Generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({product}: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero} >
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world, </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

//Chamada a API do Stripe //Static Site Generation
export const getStaticProps: GetStaticProps = async () =>{
  
  const price = await stripe.prices.retrieve('price_1LJe3eGVsv9kGfNFpcJnYQ59',{
    
  })

  const product ={
    price: price.id,
    amount: new Intl.NumberFormat('en-US', { //formatando o price para formato americano
       style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100) 
  };
  
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //revalidate every 24 hours
  }
}
