/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  CoreAppCallArgs,
  RawAppCallArgs,
  AppState,
  TealTemplateParams,
  ABIAppCallArg,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner, modelsv2 } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "optInToAsa(pay,asset)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "createApplication()void": {
      "call_config": {
        "no_op": "CREATE"
      }
    }
  },
  "bare_call_config": {
    "no_op": "NEVER",
    "opt_in": "NEVER",
    "close_out": "NEVER",
    "update_application": "NEVER",
    "delete_application": "NEVER"
  },
  "schema": {
    "local": {
      "declared": {},
      "reserved": {}
    },
    "global": {
      "declared": {},
      "reserved": {}
    }
  },
  "state": {
    "global": {
      "num_byte_slices": 0,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgovLyBUaGlzIFRFQUwgd2FzIGdlbmVyYXRlZCBieSBURUFMU2NyaXB0IHYwLjgwLjEKLy8gaHR0cHM6Ly9naXRodWIuY29tL2FsZ29yYW5kZm91bmRhdGlvbi9URUFMU2NyaXB0CgovLyBUaGlzIGNvbnRyYWN0IGlzIGNvbXBsaWFudCB3aXRoIGFuZC9vciBpbXBsZW1lbnRzIHRoZSBmb2xsb3dpbmcgQVJDczogWyBBUkM0IF0KCi8vIFRoZSBmb2xsb3dpbmcgdGVuIGxpbmVzIG9mIFRFQUwgaGFuZGxlIGluaXRpYWwgcHJvZ3JhbSBmbG93Ci8vIFRoaXMgcGF0dGVybiBpcyB1c2VkIHRvIG1ha2UgaXQgZWFzeSBmb3IgYW55b25lIHRvIHBhcnNlIHRoZSBzdGFydCBvZiB0aGUgcHJvZ3JhbSBhbmQgZGV0ZXJtaW5lIGlmIGEgc3BlY2lmaWMgYWN0aW9uIGlzIGFsbG93ZWQKLy8gSGVyZSwgYWN0aW9uIHJlZmVycyB0byB0aGUgT25Db21wbGV0ZSBpbiBjb21iaW5hdGlvbiB3aXRoIHdoZXRoZXIgdGhlIGFwcCBpcyBiZWluZyBjcmVhdGVkIG9yIGNhbGxlZAovLyBFdmVyeSBwb3NzaWJsZSBhY3Rpb24gZm9yIHRoaXMgY29udHJhY3QgaXMgcmVwcmVzZW50ZWQgaW4gdGhlIHN3aXRjaCBzdGF0ZW1lbnQKLy8gSWYgdGhlIGFjdGlvbiBpcyBub3QgaW1wbG1lbnRlZCBpbiB0aGUgY29udHJhY3QsIGl0cyByZXNwZWN0aXZlIGJyYW5jaCB3aWxsIGJlICJOT1RfSU1QTEVNRU5URUQiIHdoaWNoIGp1c3QgY29udGFpbnMgImVyciIKdHhuIEFwcGxpY2F0aW9uSUQKIQppbnQgNgoqCnR4biBPbkNvbXBsZXRpb24KKwpzd2l0Y2ggY2FsbF9Ob09wIE5PVF9JTVBMRU1FTlRFRCBOT1RfSU1QTEVNRU5URUQgTk9UX0lNUExFTUVOVEVEIE5PVF9JTVBMRU1FTlRFRCBOT1RfSU1QTEVNRU5URUQgY3JlYXRlX05vT3AgTk9UX0lNUExFTUVOVEVEIE5PVF9JTVBMRU1FTlRFRCBOT1RfSU1QTEVNRU5URUQgTk9UX0lNUExFTUVOVEVEIE5PVF9JTVBMRU1FTlRFRAoKTk9UX0lNUExFTUVOVEVEOgoJZXJyCgovLyBvcHRJblRvQXNhKHBheSxhc3NldCl2b2lkCmFiaV9yb3V0ZV9vcHRJblRvQXNhOgoJLy8gYXNzZXQ6IGFzc2V0Cgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglidG9pCgl0eG5hcyBBc3NldHMKCgkvLyBwYXlUeG46IHBheQoJdHhuIEdyb3VwSW5kZXgKCWludCAxCgktCglkdXAKCWd0eG5zIFR5cGVFbnVtCglpbnQgcGF5Cgk9PQoJYXNzZXJ0CgoJLy8gZXhlY3V0ZSBvcHRJblRvQXNhKHBheSxhc3NldCl2b2lkCgljYWxsc3ViIG9wdEluVG9Bc2EKCWludCAxCglyZXR1cm4KCi8vIG9wdEluVG9Bc2EocGF5VHhuOiBQYXlUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQKb3B0SW5Ub0FzYToKCXByb3RvIDIgMAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo0MQoJLy8gdmVyaWZ5UGF5VHhuKHBheVR4biwgewoJLy8gICAgICAgcmVjZWl2ZXI6IGdsb2JhbHMuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKCS8vICAgICB9KQoJLy8gdmVyaWZ5IHJlY2VpdmVyCglmcmFtZV9kaWcgLTEgLy8gcGF5VHhuOiBQYXlUeG4KCWd0eG5zIFJlY2VpdmVyCglnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwoJPT0KCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo0NAoJLy8gc2VuZEFzc2V0VHJhbnNmZXIoewoJLy8gICAgICAgeGZlckFzc2V0OiBhc3NldCwKCS8vICAgICAgIGFzc2V0QW1vdW50OiAwLAoJLy8gICAgICAgc2VuZGVyOiBnbG9iYWxzLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCgkvLyAgICAgICBhc3NldFJlY2VpdmVyOiBnbG9iYWxzLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCgkvLyAgICAgfSkKCWl0eG5fYmVnaW4KCWludCBheGZlcgoJaXR4bl9maWVsZCBUeXBlRW51bQoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo0NQoJLy8geGZlckFzc2V0OiBhc3NldAoJZnJhbWVfZGlnIC0yIC8vIGFzc2V0OiBBc3NldAoJaXR4bl9maWVsZCBYZmVyQXNzZXQKCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6NDYKCS8vIGFzc2V0QW1vdW50OiAwCglpbnQgMAoJaXR4bl9maWVsZCBBc3NldEFtb3VudAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo0NwoJLy8gc2VuZGVyOiBnbG9iYWxzLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKCWdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCglpdHhuX2ZpZWxkIFNlbmRlcgoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo0OAoJLy8gYXNzZXRSZWNlaXZlcjogZ2xvYmFscy5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCglnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwoJaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCgoJLy8gRmVlIGZpZWxkIG5vdCBzZXQsIGRlZmF1bHRpbmcgdG8gMAoJaW50IDAKCWl0eG5fZmllbGQgRmVlCgoJLy8gU3VibWl0IGlubmVyIHRyYW5zYWN0aW9uCglpdHhuX3N1Ym1pdAoJcmV0c3ViCgovLyBzZW5kQXNzZXRUb0NoaWxkQ29udHJhY3QocGF5LGF4ZmVyLGFzc2V0LHVpbnQ2NCx1aW50NjQpdm9pZAphYmlfcm91dGVfc2VuZEFzc2V0VG9DaGlsZENvbnRyYWN0OgoJLy8gYnV5UXVhbnQ6IHVpbnQ2NAoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwoJYnRvaQoKCS8vIHNlbGxRdWFudDogdWludDY0Cgl0eG5hIEFwcGxpY2F0aW9uQXJncyAyCglidG9pCgoJLy8gYnV5QXNzZXQ6IGFzc2V0Cgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglidG9pCgl0eG5hcyBBc3NldHMKCgkvLyBhc3NldFRyYW5zZmVyOiBheGZlcgoJdHhuIEdyb3VwSW5kZXgKCWludCAxCgktCglkdXAKCWd0eG5zIFR5cGVFbnVtCglpbnQgYXhmZXIKCT09Cglhc3NlcnQKCgkvLyBwYXlUeG46IHBheQoJdHhuIEdyb3VwSW5kZXgKCWludCAyCgktCglkdXAKCWd0eG5zIFR5cGVFbnVtCglpbnQgcGF5Cgk9PQoJYXNzZXJ0CgoJLy8gZXhlY3V0ZSBzZW5kQXNzZXRUb0NoaWxkQ29udHJhY3QocGF5LGF4ZmVyLGFzc2V0LHVpbnQ2NCx1aW50NjQpdm9pZAoJY2FsbHN1YiBzZW5kQXNzZXRUb0NoaWxkQ29udHJhY3QKCWludCAxCglyZXR1cm4KCi8vIHNlbmRBc3NldFRvQ2hpbGRDb250cmFjdChwYXlUeG46IFBheVR4biwgYXNzZXRUcmFuc2ZlcjogQXNzZXRUcmFuc2ZlclR4biwgYnV5QXNzZXQ6IEFzc2V0LCBzZWxsUXVhbnQ6IHVpbnQ2NCwgYnV5UXVhbnQ6IHVpbnQ2NCk6IHZvaWQKc2VuZEFzc2V0VG9DaGlsZENvbnRyYWN0OgoJcHJvdG8gNSAwCgoJLy8gUHVzaCBlbXB0eSBieXRlcyBhZnRlciB0aGUgZnJhbWUgcG9pbnRlciB0byByZXNlcnZlIHNwYWNlIGZvciBsb2NhbCB2YXJpYWJsZXMKCWJ5dGUgMHgKCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6NjAKCS8vIHZlcmlmeVBheVR4bihwYXlUeG4sIHsKCS8vICAgICAgIHJlY2VpdmVyOiBnbG9iYWxzLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCgkvLyAgICAgICBzZW5kZXI6IGdsb2JhbHMuY3JlYXRvckFkZHJlc3MsCgkvLyAgICAgICBhbW91bnQ6IDFfMDAwXzAwMSwKCS8vICAgICB9KQoJLy8gdmVyaWZ5IHJlY2VpdmVyCglmcmFtZV9kaWcgLTEgLy8gcGF5VHhuOiBQYXlUeG4KCWd0eG5zIFJlY2VpdmVyCglnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwoJPT0KCWFzc2VydAoKCS8vIHZlcmlmeSBzZW5kZXIKCWZyYW1lX2RpZyAtMSAvLyBwYXlUeG46IFBheVR4bgoJZ3R4bnMgU2VuZGVyCglnbG9iYWwgQ3JlYXRvckFkZHJlc3MKCT09Cglhc3NlcnQKCgkvLyB2ZXJpZnkgYW1vdW50CglmcmFtZV9kaWcgLTEgLy8gcGF5VHhuOiBQYXlUeG4KCWd0eG5zIEFtb3VudAoJaW50IDFfMDAwXzAwMQoJPT0KCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo2NgoJLy8gYXNzZXJ0KGdsb2JhbHMuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW5Ub0Fzc2V0KGFzc2V0VHJhbnNmZXIueGZlckFzc2V0KSkKCWdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCglmcmFtZV9kaWcgLTIgLy8gYXNzZXRUcmFuc2ZlcjogQXNzZXRUcmFuc2ZlclR4bgoJZ3R4bnMgWGZlckFzc2V0Cglhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKCXN3YXAKCXBvcAoJYXNzZXJ0CgoJLy8gY29udHJhY3RzL0Fzc2V0VHJhbXBvbGluZS5hbGdvLnRzOjY3CgkvLyB2ZXJpZnlBc3NldFRyYW5zZmVyVHhuKGFzc2V0VHJhbnNmZXIsIHsKCS8vICAgICAgIHNlbmRlcjogZ2xvYmFscy5jcmVhdG9yQWRkcmVzcywKCS8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IGdsb2JhbHMuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKCS8vICAgICB9KQoJLy8gdmVyaWZ5IHNlbmRlcgoJZnJhbWVfZGlnIC0yIC8vIGFzc2V0VHJhbnNmZXI6IEFzc2V0VHJhbnNmZXJUeG4KCWd0eG5zIFNlbmRlcgoJZ2xvYmFsIENyZWF0b3JBZGRyZXNzCgk9PQoJYXNzZXJ0CgoJLy8gdmVyaWZ5IGFzc2V0UmVjZWl2ZXIKCWZyYW1lX2RpZyAtMiAvLyBhc3NldFRyYW5zZmVyOiBBc3NldFRyYW5zZmVyVHhuCglndHhucyBBc3NldFJlY2VpdmVyCglnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwoJPT0KCWFzc2VydAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo3MwoJLy8gc2VuZE1ldGhvZENhbGw8W0Fzc2V0LCBBc3NldCwgdWludDY0LCB1aW50NjQsIEFjY291bnRdLCB2b2lkPih7CgkvLyAgICAgICBuYW1lOiAnY3JlYXRlQXBwbGljYXRpb24nLAoJLy8gICAgICAgY2xlYXJTdGF0ZVByb2dyYW06IENoaWxkQ29udHJhY3QuY2xlYXJQcm9ncmFtKCksCgkvLyAgICAgICBhcHByb3ZhbFByb2dyYW06IENoaWxkQ29udHJhY3QuYXBwcm92YWxQcm9ncmFtKCksCgkvLyAgICAgICBtZXRob2RBcmdzOiBbYXNzZXRUcmFuc2Zlci54ZmVyQXNzZXQsIGJ1eUFzc2V0LCBzZWxsUXVhbnQsIGJ1eVF1YW50LCBhc3NldFRyYW5zZmVyLnNlbmRlcl0sCgkvLyAgICAgICBnbG9iYWxOdW1CeXRlU2xpY2U6IENoaWxkQ29udHJhY3Quc2NoZW1hLmdsb2JhbC5udW1CeXRlU2xpY2UsCgkvLyAgICAgICBnbG9iYWxOdW1VaW50OiBDaGlsZENvbnRyYWN0LnNjaGVtYS5nbG9iYWwubnVtVWludCwKCS8vICAgICAgIGxvY2FsTnVtQnl0ZVNsaWNlOiBDaGlsZENvbnRyYWN0LnNjaGVtYS5sb2NhbC5udW1CeXRlU2xpY2UsCgkvLyAgICAgICBsb2NhbE51bVVpbnQ6IENoaWxkQ29udHJhY3Quc2NoZW1hLmxvY2FsLm51bVVpbnQsCgkvLyAgICAgfSkKCWl0eG5fYmVnaW4KCWludCBhcHBsCglpdHhuX2ZpZWxkIFR5cGVFbnVtCgltZXRob2QgImNyZWF0ZUFwcGxpY2F0aW9uKGFzc2V0LGFzc2V0LHVpbnQ2NCx1aW50NjQsYWNjb3VudCl2b2lkIgoJaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6NzUKCS8vIGNsZWFyU3RhdGVQcm9ncmFtOiBDaGlsZENvbnRyYWN0LmNsZWFyUHJvZ3JhbSgpCglieXRlIGI2NCBDZz09CglpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtCgoJLy8gY29udHJhY3RzL0Fzc2V0VHJhbXBvbGluZS5hbGdvLnRzOjc2CgkvLyBhcHByb3ZhbFByb2dyYW06IENoaWxkQ29udHJhY3QuYXBwcm92YWxQcm9ncmFtKCkKCWJ5dGUgYjY0IENpQUNBUUFtQVFkamNtVmhkRzl5TVJnVWdRWUxNUmtJalF3QXBnQUFBQUFBQUFBQUFBQUFtQUFBQUFBQUFBQUFBQUFBTmhvRkY4QWNOaG9FRnpZYUF4YzJHZ0lYd0RBMkdnRVh3RENJQUFJaVE0b0ZBSUFKYzJWc2JFRnpjMlYwaS85bmdBaGlkWGxCYzNObGRJditaNEFKYzJWc2JGRjFZVzUwaS8xbmdBaGlkWGxSZFdGdWRJdjhaeWlMKzJlSk5ob0JGOEF3aUFBQ0lrT0tBUUN4Z1FTeUVJdi9zaEVqc2hJeUNySUFNZ3F5RkNPeUFiT0pOaG9CRjhBY2lBQUNJa09LQVFBb2kvOW5pWUFFYkU1SEFEWWFBSTRCLzF3QWdBU29CUUFPZ0FTT281Q3pOaG9BamdML28vL0tBQT09CglpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbQoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo3NwoJLy8gbWV0aG9kQXJnczogW2Fzc2V0VHJhbnNmZXIueGZlckFzc2V0LCBidXlBc3NldCwgc2VsbFF1YW50LCBidXlRdWFudCwgYXNzZXRUcmFuc2Zlci5zZW5kZXJdCglmcmFtZV9kaWcgLTIgLy8gYXNzZXRUcmFuc2ZlcjogQXNzZXRUcmFuc2ZlclR4bgoJZ3R4bnMgWGZlckFzc2V0CglpdHhuX2ZpZWxkIEFzc2V0cwoJYnl0ZSAweDAwMDAwMDAwMDAwMDAwMDAKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCglmcmFtZV9kaWcgLTMgLy8gYnV5QXNzZXQ6IEFzc2V0CglpdHhuX2ZpZWxkIEFzc2V0cwoJYnl0ZSAweDAwMDAwMDAwMDAwMDAwMDEKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCglmcmFtZV9kaWcgLTQgLy8gc2VsbFF1YW50OiB1aW50NjQKCWl0b2IKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCglmcmFtZV9kaWcgLTUgLy8gYnV5UXVhbnQ6IHVpbnQ2NAoJaXRvYgoJaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKCWZyYW1lX2RpZyAtMiAvLyBhc3NldFRyYW5zZmVyOiBBc3NldFRyYW5zZmVyVHhuCglndHhucyBTZW5kZXIKCWl0eG5fZmllbGQgQWNjb3VudHMKCWJ5dGUgMHgwMDAwMDAwMDAwMDAwMDAxCglpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo3OAoJLy8gZ2xvYmFsTnVtQnl0ZVNsaWNlOiBDaGlsZENvbnRyYWN0LnNjaGVtYS5nbG9iYWwubnVtQnl0ZVNsaWNlCglpbnQgMQoJaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6NzkKCS8vIGdsb2JhbE51bVVpbnQ6IENoaWxkQ29udHJhY3Quc2NoZW1hLmdsb2JhbC5udW1VaW50CglpbnQgNAoJaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CgoJLy8gY29udHJhY3RzL0Fzc2V0VHJhbXBvbGluZS5hbGdvLnRzOjgwCgkvLyBsb2NhbE51bUJ5dGVTbGljZTogQ2hpbGRDb250cmFjdC5zY2hlbWEubG9jYWwubnVtQnl0ZVNsaWNlCglpbnQgMAoJaXR4bl9maWVsZCBMb2NhbE51bUJ5dGVTbGljZQoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo4MQoJLy8gbG9jYWxOdW1VaW50OiBDaGlsZENvbnRyYWN0LnNjaGVtYS5sb2NhbC5udW1VaW50CglpbnQgMAoJaXR4bl9maWVsZCBMb2NhbE51bVVpbnQKCgkvLyBGZWUgZmllbGQgbm90IHNldCwgZGVmYXVsdGluZyB0byAwCglpbnQgMAoJaXR4bl9maWVsZCBGZWUKCgkvLyBTdWJtaXQgaW5uZXIgdHJhbnNhY3Rpb24KCWl0eG5fc3VibWl0CgoJLy8gY29udHJhY3RzL0Fzc2V0VHJhbXBvbGluZS5hbGdvLnRzOjg0CgkvLyBjaGlsZEFwcElkID0gdGhpcy5pdHhuLmNyZWF0ZWRBcHBsaWNhdGlvbklECglpdHhuIENyZWF0ZWRBcHBsaWNhdGlvbklECglmcmFtZV9idXJ5IDAgLy8gY2hpbGRBcHBJZDogYXBwbGljYXRpb24KCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6ODUKCS8vIHNlbmRQYXltZW50KHsKCS8vICAgICAgIHJlY2VpdmVyOiBjaGlsZEFwcElkLmFkZHJlc3MsCgkvLyAgICAgICBhbW91bnQ6IHBheVR4bi5hbW91bnQsCgkvLyAgICAgfSkKCWl0eG5fYmVnaW4KCWludCBwYXkKCWl0eG5fZmllbGQgVHlwZUVudW0KCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6ODYKCS8vIHJlY2VpdmVyOiBjaGlsZEFwcElkLmFkZHJlc3MKCWZyYW1lX2RpZyAwIC8vIGNoaWxkQXBwSWQ6IGFwcGxpY2F0aW9uCglhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCglwb3AKCWl0eG5fZmllbGQgUmVjZWl2ZXIKCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6ODcKCS8vIGFtb3VudDogcGF5VHhuLmFtb3VudAoJZnJhbWVfZGlnIC0xIC8vIHBheVR4bjogUGF5VHhuCglndHhucyBBbW91bnQKCWl0eG5fZmllbGQgQW1vdW50CgoJLy8gRmVlIGZpZWxkIG5vdCBzZXQsIGRlZmF1bHRpbmcgdG8gMAoJaW50IDAKCWl0eG5fZmllbGQgRmVlCgoJLy8gU3VibWl0IGlubmVyIHRyYW5zYWN0aW9uCglpdHhuX3N1Ym1pdAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo5MAoJLy8gc2VuZE1ldGhvZENhbGw8W0Fzc2V0XSwgdm9pZD4oewoJLy8gICAgICAgbmFtZTogJ3RyaWdnZXJPcHRJbicsCgkvLyAgICAgICBhcHBsaWNhdGlvbklEOiBjaGlsZEFwcElkLAoJLy8gICAgICAgbWV0aG9kQXJnczogW2Fzc2V0VHJhbnNmZXIueGZlckFzc2V0XSwKCS8vICAgICB9KQoJaXR4bl9iZWdpbgoJaW50IGFwcGwKCWl0eG5fZmllbGQgVHlwZUVudW0KCW1ldGhvZCAidHJpZ2dlck9wdEluKGFzc2V0KXZvaWQiCglpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo5MgoJLy8gYXBwbGljYXRpb25JRDogY2hpbGRBcHBJZAoJZnJhbWVfZGlnIDAgLy8gY2hpbGRBcHBJZDogYXBwbGljYXRpb24KCWl0eG5fZmllbGQgQXBwbGljYXRpb25JRAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo5MwoJLy8gbWV0aG9kQXJnczogW2Fzc2V0VHJhbnNmZXIueGZlckFzc2V0XQoJZnJhbWVfZGlnIC0yIC8vIGFzc2V0VHJhbnNmZXI6IEFzc2V0VHJhbnNmZXJUeG4KCWd0eG5zIFhmZXJBc3NldAoJaXR4bl9maWVsZCBBc3NldHMKCWJ5dGUgMHgwMDAwMDAwMDAwMDAwMDAwCglpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwoKCS8vIEZlZSBmaWVsZCBub3Qgc2V0LCBkZWZhdWx0aW5nIHRvIDAKCWludCAwCglpdHhuX2ZpZWxkIEZlZQoKCS8vIFN1Ym1pdCBpbm5lciB0cmFuc2FjdGlvbgoJaXR4bl9zdWJtaXQKCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6OTUKCS8vIHNlbmRBc3NldFRyYW5zZmVyKHsKCS8vICAgICAgIHhmZXJBc3NldDogYXNzZXRUcmFuc2Zlci54ZmVyQXNzZXQsCgkvLyAgICAgICBhc3NldFJlY2VpdmVyOiBjaGlsZEFwcElkLmFkZHJlc3MsCgkvLyAgICAgICBhc3NldEFtb3VudDogYXNzZXRUcmFuc2Zlci5hc3NldEFtb3VudCwKCS8vICAgICB9KQoJaXR4bl9iZWdpbgoJaW50IGF4ZmVyCglpdHhuX2ZpZWxkIFR5cGVFbnVtCgoJLy8gY29udHJhY3RzL0Fzc2V0VHJhbXBvbGluZS5hbGdvLnRzOjk2CgkvLyB4ZmVyQXNzZXQ6IGFzc2V0VHJhbnNmZXIueGZlckFzc2V0CglmcmFtZV9kaWcgLTIgLy8gYXNzZXRUcmFuc2ZlcjogQXNzZXRUcmFuc2ZlclR4bgoJZ3R4bnMgWGZlckFzc2V0CglpdHhuX2ZpZWxkIFhmZXJBc3NldAoKCS8vIGNvbnRyYWN0cy9Bc3NldFRyYW1wb2xpbmUuYWxnby50czo5NwoJLy8gYXNzZXRSZWNlaXZlcjogY2hpbGRBcHBJZC5hZGRyZXNzCglmcmFtZV9kaWcgMCAvLyBjaGlsZEFwcElkOiBhcHBsaWNhdGlvbgoJYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwoJcG9wCglpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKCgkvLyBjb250cmFjdHMvQXNzZXRUcmFtcG9saW5lLmFsZ28udHM6OTgKCS8vIGFzc2V0QW1vdW50OiBhc3NldFRyYW5zZmVyLmFzc2V0QW1vdW50CglmcmFtZV9kaWcgLTIgLy8gYXNzZXRUcmFuc2ZlcjogQXNzZXRUcmFuc2ZlclR4bgoJZ3R4bnMgQXNzZXRBbW91bnQKCWl0eG5fZmllbGQgQXNzZXRBbW91bnQKCgkvLyBGZWUgZmllbGQgbm90IHNldCwgZGVmYXVsdGluZyB0byAwCglpbnQgMAoJaXR4bl9maWVsZCBGZWUKCgkvLyBTdWJtaXQgaW5uZXIgdHJhbnNhY3Rpb24KCWl0eG5fc3VibWl0CglyZXRzdWIKCmFiaV9yb3V0ZV9jcmVhdGVBcHBsaWNhdGlvbjoKCWludCAxCglyZXR1cm4KCmNyZWF0ZV9Ob09wOgoJbWV0aG9kICJjcmVhdGVBcHBsaWNhdGlvbigpdm9pZCIKCXR4bmEgQXBwbGljYXRpb25BcmdzIDAKCW1hdGNoIGFiaV9yb3V0ZV9jcmVhdGVBcHBsaWNhdGlvbgoJZXJyCgpjYWxsX05vT3A6CgltZXRob2QgIm9wdEluVG9Bc2EocGF5LGFzc2V0KXZvaWQiCgltZXRob2QgInNlbmRBc3NldFRvQ2hpbGRDb250cmFjdChwYXksYXhmZXIsYXNzZXQsdWludDY0LHVpbnQ2NCl2b2lkIgoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAoJbWF0Y2ggYWJpX3JvdXRlX29wdEluVG9Bc2EgYWJpX3JvdXRlX3NlbmRBc3NldFRvQ2hpbGRDb250cmFjdAoJZXJy",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEw"
  },
  "contract": {
    "name": "AssetTrampoline",
    "desc": "",
    "methods": [
      {
        "name": "optInToAsa",
        "args": [
          {
            "name": "payTxn",
            "type": "pay"
          },
          {
            "name": "asset",
            "type": "asset"
          }
        ],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "sendAssetToChildContract",
        "args": [
          {
            "name": "payTxn",
            "type": "pay"
          },
          {
            "name": "assetTransfer",
            "type": "axfer"
          },
          {
            "name": "buyAsset",
            "type": "asset"
          },
          {
            "name": "sellQuant",
            "type": "uint64"
          },
          {
            "name": "buyQuant",
            "type": "uint64"
          }
        ],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "createApplication",
        "args": [],
        "returns": {
          "type": "void"
        }
      }
    ]
  }
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt 
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

/**
 * Defines the types of available calls and state of the AssetTrampoline smart contract.
 */
export type AssetTrampoline = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'optInToAsa(pay,asset)void' | 'optInToAsa', {
      argsObj: {
        payTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>
        asset: number | bigint
      }
      argsTuple: [payTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>, asset: number | bigint]
      returns: void
    }>
    & Record<'sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void' | 'sendAssetToChildContract', {
      argsObj: {
        payTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>
        assetTransfer: TransactionToSign | Transaction | Promise<SendTransactionResult>
        buyAsset: number | bigint
        sellQuant: bigint | number
        buyQuant: bigint | number
      }
      argsTuple: [payTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>, assetTransfer: TransactionToSign | Transaction | Promise<SendTransactionResult>, buyAsset: number | bigint, sellQuant: bigint | number, buyQuant: bigint | number]
      returns: void
    }>
    & Record<'createApplication()void' | 'createApplication', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
}
/**
 * Defines the possible abi call signatures
 */
export type AssetTrampolineSig = keyof AssetTrampoline['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends AssetTrampolineSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the AssetTrampoline smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends AssetTrampolineSig> = AssetTrampoline['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the AssetTrampoline smart contract to the method's return type
 */
export type MethodReturn<TSignature extends AssetTrampolineSig> = AssetTrampoline['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type AssetTrampolineCreateCalls = (typeof AssetTrampolineCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type AssetTrampolineCreateCallParams =
  | (TypedCallParams<'createApplication()void'> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type AssetTrampolineDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: AssetTrampolineCreateCalls) => AssetTrampolineCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class AssetTrampolineCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the AssetTrampoline smart contract using the createApplication()void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      createApplication(args: MethodArgs<'createApplication()void'>, params: AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: 'createApplication()void' as const,
          methodArgs: Array.isArray(args) ? args : [],
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the optInToAsa(pay,asset)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static optInToAsa(args: MethodArgs<'optInToAsa(pay,asset)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'optInToAsa(pay,asset)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.payTxn, args.asset],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static sendAssetToChildContract(args: MethodArgs<'sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.payTxn, args.assetTransfer, args.buyAsset, args.sellQuant, args.buyQuant],
      ...params,
    }
  }
}

/**
 * A client to make calls to the AssetTrampoline smart contract
 */
export class AssetTrampolineClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `AssetTrampolineClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue }
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof AssetTrampoline['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the AssetTrampoline smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: AssetTrampolineDeployArgs & AppClientDeployCoreParams = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(AssetTrampolineCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the AssetTrampoline smart contract using the createApplication()void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The create result
       */
      async createApplication(args: MethodArgs<'createApplication()void'>, params: AppClientCallCoreParams & AppClientCompilationParams & (OnCompleteNoOp) = {}): Promise<AppCallTransactionResultOfType<MethodReturn<'createApplication()void'>>> {
        return $this.mapReturnValue(await $this.appClient.create(AssetTrampolineCallFactory.create.createApplication(args, params)))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the AssetTrampoline smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the optInToAsa(pay,asset)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public optInToAsa(args: MethodArgs<'optInToAsa(pay,asset)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(AssetTrampolineCallFactory.optInToAsa(args, params))
  }

  /**
   * Calls the sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public sendAssetToChildContract(args: MethodArgs<'sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(AssetTrampolineCallFactory.sendAssetToChildContract(args, params))
  }

  public compose(): AssetTrampolineComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      optInToAsa(args: MethodArgs<'optInToAsa(pay,asset)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.optInToAsa(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      sendAssetToChildContract(args: MethodArgs<'sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.sendAssetToChildContract(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate() {
        await promiseChain
        const result = await atc.simulate(client.algod)
        return result
      },
      async execute() {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams: {} }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as AssetTrampolineComposer
  }
}
export type AssetTrampolineComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the optInToAsa(pay,asset)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  optInToAsa(args: MethodArgs<'optInToAsa(pay,asset)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs): AssetTrampolineComposer<[...TReturns, MethodReturn<'optInToAsa(pay,asset)void'>]>

  /**
   * Calls the sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  sendAssetToChildContract(args: MethodArgs<'sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void'>, params?: AppClientCallCoreParams & CoreAppCallArgs): AssetTrampolineComposer<[...TReturns, MethodReturn<'sendAssetToChildContract(pay,axfer,asset,uint64,uint64)void'>]>

  /**
   * Makes a clear_state call to an existing instance of the AssetTrampoline smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs): AssetTrampolineComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): AssetTrampolineComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(): Promise<AssetTrampolineComposerSimulateResult>
  /**
   * Executes the transaction group and returns the results
   */
  execute(): Promise<AssetTrampolineComposerResults<TReturns>>
}
export type AssetTrampolineComposerSimulateResult = {
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type AssetTrampolineComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
