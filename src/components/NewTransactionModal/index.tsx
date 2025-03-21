import *  as Dialog  from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
});

type NewTransactionFormInputs = z.infer<typeof newTransactionSchema>;


export function NewTransactionModal () {
    const { createTransaction } = useContext(TransactionsContext)

    const { control, register, handleSubmit, formState: { isSubmitting}, reset } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionSchema),
        defaultValues: {
            type: 'income'
        }
    });

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) { 
        const  { category, description, price, type } = data;

       await createTransaction({
            category,
            description,
            price,
            type
       })
        reset()

    }

    return(
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>New Transaction</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input type="text" placeholder="Description" required {...register('description')}/>
                    <input type="number" placeholder="Price" required {...register('price', { valueAsNumber: true })}/>
                    <input type="text" placeholder="Category" required {...register('category')}/>

                    <Controller 
                        control={control}
                        name="type"
                        render= {({ field }) => {
                            console.log(field)
                            return(
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24}/>
                                        Income
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24}/>
                                        Outcome
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>Register</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}